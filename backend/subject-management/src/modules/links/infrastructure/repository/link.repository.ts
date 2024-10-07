import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Link } from '../../domain/entities/link.entity';
import { ILinkRepository } from '../../domain/repositories/link.repository';


@Injectable()
export class LinkRepository implements ILinkRepository {
    constructor(
        @InjectRepository(Link)
        private readonly repository: Repository<Link>,
    ) { }

    create(link: Link): Promise<Link> {
        return this.repository.save(link);
    }

    createBook(links: Link[]): Promise<Link[]> {
        return this.repository.save(links);
    }

    async deleteBySubjectId(subjectId: string): Promise<void> {
        await this.repository.delete({ subject: { id: subjectId } })
    }
}
