import { Inject, Injectable } from '@nestjs/common';
import { ILinkRepository } from '../../../domain/repositories/link.repository';
import { ILinkService } from '../../../domain/services/link.service';
import { Link } from '../../../../links/domain/entities/link.entity';

@Injectable()
export class LinkService implements ILinkService {
    constructor(
        @Inject('ILinkRepository')
        private readonly linkRepository: ILinkRepository
    ) { }

    create(link: Link): Promise<Link> {
        return this.linkRepository.create(link);
    }
    createBook(links: Link[]): Promise<Link[]> {
        return this.linkRepository.createBook(links);
    }

    deleteBySubjectId(subjectId: string): Promise<void> {
        return this.linkRepository.deleteBySubjectId(subjectId);
    }
}
