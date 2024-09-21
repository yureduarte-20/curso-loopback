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
  Product,
} from '../models';
import {OrderRepository} from '../repositories';

export class OrderProductController {
  constructor(
    @repository(OrderRepository)
    public orderRepository: OrderRepository,
  ) { }

  @get('/orders/{id}/product', {
    responses: {
      '200': {
        description: 'Product belonging to Order',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Product),
          },
        },
      },
    },
  })
  async getProduct(
    @param.path.string('id') id: typeof Order.prototype.id,
  ): Promise<Product> {
    return this.orderRepository.product(id);
  }
}
