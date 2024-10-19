import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Order,
  Customer,
} from '../models';
import {OrderRepository} from '../repositories';
import { authenticate } from '@loopback/authentication';
@authenticate("jwt")
export class OrderCustomerController {
  constructor(
    @repository(OrderRepository)
    public orderRepository: OrderRepository,
  ) { }

  @get('/orders/{id}/customer', {
    responses: {
      '200': {
        description: 'Customer belonging to Order',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Customer),
          },
        },
      },
    },
  })
  async getCustomer(
    @param.path.string('id') id: typeof Order.prototype.id,
  ): Promise<Customer> {
    return this.orderRepository.customer(id);
  }
}
