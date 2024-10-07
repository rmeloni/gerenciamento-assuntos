import { CreateSubjectCommand } from '../../application/commands/create-subject.command';
import { UpdateSubjectCommand } from '../../application/commands/update-subject.command';
import { SubjectDto } from '../../application/dtos/subject.dto';

export interface ISubjectService {
  create(command: CreateSubjectCommand): Promise<SubjectDto>;
  findAll(): Promise<SubjectDto[]>;
  findById(id: string): Promise<SubjectDto>;
  update(id: string, subject: UpdateSubjectCommand): Promise<SubjectDto>;
  delete(id: string): Promise<void>;
}
