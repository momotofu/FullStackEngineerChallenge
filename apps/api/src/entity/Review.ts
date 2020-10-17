import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToOne,
  JoinColumn,
} from 'typeorm';

import Employee from './Employee';

@Entity()
export default class Review {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  dateCreated: string;

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

  @OneToOne(type => Employee)
  @JoinColumn()
  assignedTo: Employee;

  @ManyToOne(() => Employee, employee => employee.reviews)
  ownedBy: Employee;
}