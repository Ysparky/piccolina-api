import { Ingredient } from 'src/ingredients/entities/ingredient.entity';
import { Item } from 'src/items/entities/item.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('recipe')
export class Recipe {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  code: string;

  @JoinColumn({ name: 'item_id' })
  @ManyToOne(() => Item, (item) => item.recipe, { nullable: false })
  item: Item;

  @JoinColumn({ name: 'ingredient_id' })
  @ManyToOne(() => Ingredient, (ingredient) => ingredient.recipe, {
    nullable: false,
  })
  ingredient: Ingredient;

  @Column()
  quantity: number;

  @Column()
  unit: string;

  @Column({ default: true })
  flag: boolean;
}
