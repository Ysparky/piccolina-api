import { MenuItem } from '../../menu-item/entities/menu-item.entity';
import { OrderItem } from '../../order-item/entities/order-item.entity';
import { Recipe } from '../../recipes/entities/recipe.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity('item')
export class Item {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  code: string;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  type: string;

  @Column()
  price: number;

  @Column({ default: true })
  cooking: boolean;

  @Column({ nullable: true })
  quantity: number;

  @Column({ nullable: true })
  unit: string;

  @Column({ default: true })
  flag: boolean;

  @OneToMany(() => Recipe, (recipe) => recipe.item)
  recipe: Recipe[];

  @OneToMany(() => MenuItem, (menuItem) => menuItem.item)
  menuItem: MenuItem[];

  @OneToMany(() => OrderItem, (orderItem) => orderItem.item)
  orderItem: OrderItem[];
}
