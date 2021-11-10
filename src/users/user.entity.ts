import { Field, Int, ObjectType } from '@nestjs/graphql';
import { RefreshToken } from 'src/auth/entities/refresh-token.entity';
import { hashPassword } from 'src/utils/password';
import {
  BeforeInsert,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@ObjectType()
@Entity('users')
export class User {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  email: string;

  @Field()
  @Column()
  password: string;

  @Field(() => Date)
  @Column({ name: 'created_at' })
  createdAt: Date;

  @Field(() => Date)
  @Column({ name: 'updated_at' })
  updatedAt: Date;

  @Field(() => [RefreshToken])
  @OneToMany(() => RefreshToken, (refreshToken) => refreshToken.user, {
    cascade: true,
  })
  refreshTokens: RefreshToken[];

  @BeforeInsert()
  async hashPassword() {
    this.password = await hashPassword(this.password);
  }
}
