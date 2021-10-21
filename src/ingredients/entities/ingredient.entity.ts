import { Recipe } from 'src/recipes/entities/recipe.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity('ingredient')
export class Ingredient {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  code: string;

  @Column()
  name: string;

  @Column()
  summary: string;

  @Column()
  quantity: number;

  @Column()
  unit: string;

  @Column()
  type: string;

  @Column({ default: true })
  flag: boolean;

  @OneToMany(() => Recipe, (recipe) => recipe.ingredient)
  recipe: Recipe[];
}
