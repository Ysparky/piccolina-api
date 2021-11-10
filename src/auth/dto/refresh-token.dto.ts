import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class RefreshTokenDTO {
  @Field()
  refreshToken: string;
}
