import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { Subject } from '../../../domain/entities/subject.entity';
import { CreateSubjectCommand } from '../../commands/create-subject.command';
import { UpdateSubjectCommand } from '../../commands/update-subject.command';
import { ISubjectService } from '../../../domain/services/subject.service';
import { ISubjectRepository } from '../../../domain/repositories/subject.repository';
import { SubjectDto } from '../../dtos/subject.dto';
import { Link } from '../../../../links/domain/entities/link.entity';
import { ILinkService } from '../../../../links/domain/services/link.service';
import { GdeltService } from '../../../infrastructure/api/gdelt.service';

@Injectable()
export class SubjectService implements ISubjectService {
  constructor(
    @Inject('ISubjectRepository')
    private readonly subjectRepository: ISubjectRepository,
    @Inject('ILinkService')
    private readonly linkRepository: ILinkService,
    private readonly gdeltService: GdeltService
  ) { }

  async create(command: CreateSubjectCommand): Promise<SubjectDto> {
    const subject = await this.subjectRepository.create(command);
    await this.fetchLinksAndInsertLinks(subject, command.keywords);
    return this.mapToDto(subject);
  }

  async findAll(): Promise<SubjectDto[]> {
    const subjects = await this.subjectRepository.findAll();
    return subjects.map(this.mapToDto);
  }

  async findById(id: string): Promise<SubjectDto> {
    const subject = await this.subjectRepository.findById(id);
    if (!subject) {
      throw new NotFoundException(`Subject with id ${id} not found`);
    }
    return this.mapToDto(subject);
  }

  async update(
    id: string,
    subjectData: UpdateSubjectCommand
  ): Promise<SubjectDto> {

    const subjectDb = await this.subjectRepository.findById(id);
    await this.fetchLinksAndInsertLinks(subjectDb, subjectData.keywords);
    const subject = await this.subjectRepository.update(id, subjectData);

    return this.mapToDto(subject);
  }

  async delete(id: string): Promise<void> {
    await this.linkRepository.deleteBySubjectId(id);
    await this.subjectRepository.delete(id);
  }


  private async fetchLinksAndInsertLinks(subject: Subject, keywords: string): Promise<void> {
    const responseApi = await this.gdeltService.fetchLinks(keywords);
    this.linkRepository.createBook(this.mapToListEntityLink(subject, this.stringResultToList(responseApi)));
  }

  private mapToDto(subject: Subject): SubjectDto {
    return {
      id: subject.id,
      title: subject.title,
      keywords: subject.keywords,
      status: subject.status,
      createdAt: subject.createdAt,
      updatedAt: subject.updatedAt,
      links: subject.links?.map(link => link.link)
    };
  }

  private mapToEntityLink(subject: Subject, linkData: string): Link {
    const link = new Link();
    link.subject = subject;
    link.link = linkData;
    return link;
  }

  private mapToListEntityLink(subject: Subject, linksData: string[]): Link[] {
    const links: Link[] = [];
    linksData.forEach(linkItem => {
      if (linkItem)
        links.push(this.mapToEntityLink(subject, linkItem))
    })
    return links;
  }

  private stringResultToList(urls: string): string[] {
    const lines = urls.trim().split('\n');
    const links = lines.map(line => line.split(',')[2]).filter(link => link && link.includes('http'));
    return links;
  }
}
