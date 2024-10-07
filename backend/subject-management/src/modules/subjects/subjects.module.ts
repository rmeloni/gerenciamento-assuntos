import { Module } from '@nestjs/common';
import { SubjectController } from './presentation/controllers/subject/subject.controller';
import { SubjectService } from './application/services/subject/subject.service';

@Module({
  controllers: [SubjectController],
  providers: [SubjectService],
})
export class SubjectsModule { }
