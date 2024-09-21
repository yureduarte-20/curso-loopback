import {inject, lifeCycleObserver, LifeCycleObserver} from '@loopback/core';
import {juggler} from '@loopback/repository';

const config = {
  name: 'MongoDBSource',
  connector: 'mongodb',
  url: 'mongodb://app-curso-root:app-curso-senha@mongo:27017/',
  host: '',
  port: 0,
  user: '',
  password: '',
  database: '',
  useNewUrlParser: true
};

// Observe application's life cycle to disconnect the datasource when
// application is stopped. This allows the application to be shut down
// gracefully. The `stop()` method is inherited from `juggler.DataSource`.
// Learn more at https://loopback.io/doc/en/lb4/Life-cycle.html
@lifeCycleObserver('datasource')
export class MongoDbSourceDataSource extends juggler.DataSource
  implements LifeCycleObserver {
  static dataSourceName = 'MongoDBSource';
  static readonly defaultConfig = config;

  constructor(
    @inject('datasources.config.MongoDBSource', {optional: true})
    dsConfig: object = config,
  ) {
    super(dsConfig);
  }
}
