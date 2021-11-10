import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class RegisterUserDTO {
  @Field()
  email: string;

  @Field()
  password: string;
}
