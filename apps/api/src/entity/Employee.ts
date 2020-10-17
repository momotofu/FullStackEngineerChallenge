import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
} from 'typeorm';

import Review from './Review';

@Entity()
export default class Employee {

  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100 })
  name: string;

  @Column({ length: 100 })
  email: string;

  @Column()
  bio: string;

  @Column()
  photoURL: string;

  @Column()
  passwordHash: string;

  @Column()
  isAdmin: boolean;

  @OneToMany(() => Review, review => review.ownedBy)
  reviews: Review[];
}