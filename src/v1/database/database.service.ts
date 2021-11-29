import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';
import { ConnectionManager, getConnectionManager } from 'typeorm';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';

@Injectable()
export class TypeOrmConfigService implements TypeOrmOptionsFactory {
  constructor(private configService: ConfigService) {}

  async createTypeOrmOptions(): Promise<TypeOrmModuleOptions> {
    const connectionManager: ConnectionManager = getConnectionManager();
    const connectionName: string = 'default';
    let options: TypeOrmModuleOptions;

    if (connectionManager.has(connectionName)) {
      options = connectionManager.get(connectionName).options;
      console.log(
        'connectionManager.connections',
        connectionManager.connections,
      );
      await connectionManager.get(connectionName).close();
    } else {
      options = {
        type: 'postgres',
        host: this.configService.get<string>('DB_HOST'),
        port: this.configService.get<number>('DB_PORT'),
        database: this.configService.get<string>('DB_NAME'),
        username: this.configService.get<string>('DB_USERNAME'),
        password: this.configService.get<string>('DB_PASSWORD'),
        synchronize: this.configService.get<string>('NODE_ENV') === 'dev',
        migrationsRun: this.configService.get<string>('NODE_ENV') === 'dev',
        entities: ['dist/**/*.entity.js'],
        migrations: ['dist/migrations/*.js'],
        namingStrategy: new SnakeNamingStrategy(),
      };
    }
    return options;
  }
}
