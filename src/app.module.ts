import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import config from './constants';
import { DatabaseModule } from './database/database.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      load: [config],
      isGlobal: true,
    }),
    DatabaseModule,
  ],
})
export class AppModule {}
