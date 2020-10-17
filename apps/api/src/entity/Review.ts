import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
} from 'typeorm';

import Employee from './Employee';

@Entity()
export default class Review {

  @PrimaryGeneratedColumn()
  id: number;

  /**
   * Review form information start.
   */
  @Column()
  isComplete: boolean;

  @Column()
  learnFromMistakes: number;

  @Column()
  madeGoodEffort: number;

  @Column()
  communication: number;

  @Column()
  friendliness: number;

  @Column()
  problemSolving: number;

  @Column()
  reliability: number;

  @Column({ length: 500 })
  somethingNice: string;

  @Column({ length: 500 })
  otherObservations: string;
  /**
   * Review form information end.
   */

  @Column({ nullable: true })
  assignedTo: number;

  @ManyToOne(() => Employee, employee => employee.reviews)
  ownedBy: Employee;
}