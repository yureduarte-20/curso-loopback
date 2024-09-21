import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {MongoDbSourceDataSource} from '../datasources';
import {Order, OrderRelations, Customer, Product} from '../models';
import {CustomerRepository} from './customer.repository';
import {ProductRepository} from './product.repository';

export class OrderRepository extends DefaultCrudRepository<
  Order,
  typeof Order.prototype.id,
  OrderRelations
> {

  public readonly customer: BelongsToAccessor<Customer, typeof Order.prototype.id>;

  public readonly product: BelongsToAccessor<Product, typeof Order.prototype.id>;

  constructor(
    @inject('datasources.MongoDBSource') dataSource: MongoDbSourceDataSource, @repository.getter('CustomerRepository') protected customerRepositoryGetter: Getter<CustomerRepository>, @repository.getter('ProductRepository') protected productRepositoryGetter: Getter<ProductRepository>,
  ) {
    super(Order, dataSource);
    this.product = this.createBelongsToAccessorFor('product', productRepositoryGetter,);
    this.registerInclusionResolver('product', this.product.inclusionResolver);
    this.customer = this.createBelongsToAccessorFor('customer', customerRepositoryGetter,);
    this.registerInclusionResolver('customer', this.customer.inclusionResolver);
  }
}
