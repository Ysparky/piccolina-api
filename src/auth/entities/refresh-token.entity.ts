import { Field, Int, ObjectType } from '@nestjs/graphql';
import { User } from 'src/users/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@ObjectType()
@Entity({ name: 'refresh_tokens' })
export class RefreshToken {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id: number;

  @Field(() => User)
  @ManyToOne(() => User, (user) => user.refreshTokens, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Field(() => Boolean)
  @Column({ default: false, name: 'is_revoked' })
  revoked: boolean;

  @Field(() => Boolean)
  @Column()
  expires: Date;

  @Field(() => Boolean)
  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @Field(() => Boolean)
  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
