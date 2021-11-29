import { Item } from '../../items/entities/item.entity';
import { Menu } from '../../menus/entities/menu.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('menu_item')
export class MenuItem {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  code: string;

  @JoinColumn({ name: 'menu_id' })
  @ManyToOne(() => Menu, (menu) => menu.menuItem, { nullable: false })
  menu: Menu;

  @JoinColumn({ name: 'item_id' })
  @ManyToOne(() => Item, (item) => item.menuItem, { nullable: false })
  item: Item;

  @Column({ default: true })
  active: boolean;

  @Column({ default: true })
  flag: boolean;
}
