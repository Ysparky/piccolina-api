import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class CreateUserDTO {
  @Field()
  email: string;

  @Field()
  password: string;
}
