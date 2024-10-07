import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { IsString, IsNotEmpty } from 'class-validator';
import { Subject } from '../../../subjects/domain/entities/subject.entity';

@Entity()
export class Link {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @IsNotEmpty()
  @IsString()
  @Column()
  link: string;

  @ManyToOne(() => Subject, (subject) => subject.links)
  subject: Subject;
}