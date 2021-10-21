import { MenuItem } from 'src/models/menu-item/entities/menu-item.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity('menu')
export class Menu {
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

  @Column({ default: true })
  flag: boolean;

  @OneToMany(() => MenuItem, (menuItem) => menuItem.menu)
  menuItem: MenuItem[];
}
