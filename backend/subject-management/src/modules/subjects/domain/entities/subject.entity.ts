import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { IsEnum, IsString, IsNotEmpty } from 'class-validator';
import { SubjectStatus } from './subject-status.enum';
import { Link } from '../../../../modules/links/domain/entities/link.entity';

@Entity()
export class Subject {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @IsNotEmpty()
  @IsString()
  @Column()
  title: string;

  @IsNotEmpty()
  @IsString()
  @Column()
  keywords: string;

  @IsEnum(SubjectStatus)
  @Column({
    type: 'enum',
    enum: SubjectStatus,
    default: SubjectStatus.PENDING,
  })
  status: SubjectStatus;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
  updatedAt: Date;

  //  { eager: true } se você quiser os links sempre que buscar um assunto
  @OneToMany(() => Link, link => link.subject, { eager: true })
  links: Link[];
}