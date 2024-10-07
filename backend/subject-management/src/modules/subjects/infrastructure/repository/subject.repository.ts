import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Subject } from '../../domain/entities/subject.entity';
import { ISubjectRepository } from '../../domain/repositories/subject.repository';
import { UpdateSubjectCommand } from '../../application/commands/update-subject.command';

@Injectable()
export class SubjectRepository implements ISubjectRepository {
    constructor(
        @InjectRepository(Subject)
        private readonly repository: Repository<Subject>,
    ) { }

    findAll(): Promise<Subject[]> {
        return this.repository.find({ relations: ['links'], });
    }

    findById(id: string): Promise<Subject> {
        return this.repository.findOne({ where: { id }, relations: ['links'], });
    }

    create(subject: Subject): Promise<Subject> {
        return this.repository.save(subject);
    }

    async update(id: string, subjectData: UpdateSubjectCommand): Promise<Subject> {
        const subject = await this.findById(id);
        Object.assign(subject, subjectData);
        return this.repository.save(subject);
    }

    async delete(id: string): Promise<void> {
        await this.repository.delete(id);
    }
}
