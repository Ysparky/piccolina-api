import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService, ConfigType } from '@nestjs/config';
import { JwtModule, JwtModuleOptions } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from '../users/users.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import config from '../constants';

@Module({
  imports: [
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [config.KEY],
      useFactory: (
        configService: ConfigType<typeof config>,
      ): JwtModuleOptions => {
        const { expires_in, jwt_secret } = configService;
        return {
          secret: jwt_secret,
          signOptions: {
            expiresIn: expires_in,
          },
        };
      },
    }),
    TypeOrmModule.forFeature([]),
    UserModule,
  ],
  controllers: [AuthController],
  providers: [AuthService],
  exports: [],
})
export class AuthModule {}
