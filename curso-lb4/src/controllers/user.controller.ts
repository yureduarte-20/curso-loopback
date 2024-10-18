// Uncomment these imports to begin using these cool features!
import {TokenService} from '@loopback/authentication';
import {
  Credentials,
  MyUserService,
  TokenServiceBindings,
  User,
  UserRepository,
  UserServiceBindings
} from '@loopback/authentication-jwt';
import {inject} from '@loopback/core';
import {model, property, repository} from '@loopback/repository';
import {getModelSchemaRef, HttpErrors, post, requestBody, response, SchemaObject} from '@loopback/rest';
import {SecurityBindings, UserProfile} from '@loopback/security';
import {genSalt, hash} from 'bcryptjs';
import _ from 'lodash';

@model()
export class NewUserRequest extends User {
  @property({
    type: 'string',
    required: true,
  })
  password: string;
}

const CredentialsSchema: SchemaObject = {
  type: 'object',
  required: ['email', 'password'],
  properties: {
    email: {
      type: 'string',
      format: 'email',
    },
    password: {
      type: 'string',
      minLength: 8,
    },
  },
};

export const CredentialsRequestBody = {
  description: 'The input of login function',
  required: true,
  content: {
    'application/json': {schema: CredentialsSchema},
  },
};

export class UserController {
  constructor(
    @inject(TokenServiceBindings.TOKEN_SERVICE)
    public jwtService: TokenService,
    @inject(UserServiceBindings.USER_SERVICE)
    public userService: MyUserService,
    @inject(SecurityBindings.USER, {optional: true})
    public user: UserProfile,
    @repository(UserRepository) protected userRepository: UserRepository,
  ) { }

  @post('/login')
  @response(200, {
    content: {
      'application/json': {
        schema: {
          type: "object",
          properties: {
            token: {
              type: 'string'
            }
          }
        }
      }
    }
  })
  async login(
    @requestBody(CredentialsRequestBody)
    body: Credentials
  ) {
    const user = await this.userService.verifyCredentials(body)
    const userProfile = this.userService.convertToUserProfile(user)
    const token = await this.jwtService.generateToken(userProfile);
    return {token}
  }

  @post('/signup')
  @response(201)
  async signup(
    @requestBody({
      content: {'application/json': {schema: getModelSchemaRef(NewUserRequest)}}
    })
    body: NewUserRequest
  ) {

    const exists = await this.userRepository.findOne({where: {email: body.email}})
    if (exists) {
      throw HttpErrors.UnprocessableEntity('Email já está sendo utilizado');
    }
    const password = await hash(body.password, await genSalt());
    const newUser = await this.userRepository.create(_.omit(body, 'password'))
    await this.userRepository.userCredentials(newUser.id).create({password})
    return newUser
  }
}
