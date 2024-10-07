import { CreateSubjectCommand } from '../../application/commands/create-subject.command';
import { UpdateSubjectCommand } from '../../application/commands/update-subject.command';
import { Subject } from '../entities/subject.entity';


export interface ISubjectRepository {
  create(command: CreateSubjectCommand): Promise<Subject>;
  findAll(): Promise<Subject[]>;
  findById(id: string): Promise<Subject>;
  update(id: string, subject: UpdateSubjectCommand): Promise<Subject>;
  delete(id: string): Promise<void>;
}
