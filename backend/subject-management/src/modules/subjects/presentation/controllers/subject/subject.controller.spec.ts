import { Test, TestingModule } from '@nestjs/testing';
import { SubjectController } from './subject.controller';
import { ISubjectService } from '../../../domain/services/subject.service';
import { CreateSubjectCommand } from '../../../application/commands/create-subject.command';
import { UpdateSubjectCommand } from '../../../application/commands/update-subject.command';
import { SubjectStatus } from '../../../domain/entities/subject-status.enum';
import { SubjectService } from '../../../application/services/subject/subject.service';
import { Link } from '../../../../links/domain/entities/link.entity';
import { ILinkService } from '../../../../links/domain/services/link.service';
import { LinkService } from '../../../../links/application/services/link/link.service';
import { SubjectRepository } from '../../../infrastructure/repository/subject.repository';
import { LinkRepository } from '../../../../links/infrastructure/repository/link.repository';

describe('SubjectController', () => {
  let controller: SubjectController;
  let subjectService: ISubjectService;
  let linkService: ILinkService;
  const id = 'dd495561-be5a-458c-83c5-c517cf79657d';

  const mockSubjectService = {
    create: jest.fn((dto: CreateSubjectCommand) => {
      return Promise.resolve({ id, ...dto });
    }),
    findAll: jest.fn(() => {
      return Promise.resolve([{ id, titulo: 'NestJS' }]);
    }),
    findById: jest.fn((id: string) => {
      return Promise.resolve({ id, titulo: 'NestJS' });
    }),
    update: jest.fn((id: string, dto: UpdateSubjectCommand) => {
      return Promise.resolve({ id, ...dto });
    }),
    delete: jest.fn((id: string) => {
      return Promise.resolve();
    }),
  };

  const mockLinkService = {
    create: jest.fn((link: Link) => {
      return Promise.resolve({ id, ...link });
    }),

    createBook: jest.fn((links: Link[]) => {
      return Promise.resolve([{ id, ...links }]);
    }),

    deleteBySubjectId: jest.fn((subjectId: string) => {
      return Promise.resolve();
    }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SubjectController],
      providers: [
        { provide: 'ISubjectService', useValue: mockSubjectService },
        { provide: 'ISubjectRepository', useValue: SubjectRepository },
        { provide: 'ILinkService', useValue: mockLinkService },
        { provide: 'ILinkRepository', useValue: LinkRepository }
      ],
    }).compile();

    controller = module.get<SubjectController>(SubjectController);
    subjectService = module.get<SubjectService>('ISubjectService');
    linkService = module.get<LinkService>('ILinkService');
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should create a subject', async () => {
      const dto: CreateSubjectCommand = { title: 'NestJS', keywords: 'NestJS', status: SubjectStatus.PENDING };
      const result = await controller.create(dto);
      expect(result).toHaveProperty('id');
      expect(result.title).toBe(dto.title);
      expect(subjectService.create).toHaveBeenCalledWith(dto);
    });
  });

  describe('findAll', () => {
    it('should return an array of subjects', async () => {
      const result = await controller.findAll();
      expect(result).toEqual([{ id, titulo: 'NestJS' }]);
      expect(subjectService.findAll).toHaveBeenCalled();
    });
  });

  describe('findById', () => {
    it('should return a subject by ID', async () => {
      const result = await controller.findById(id);
      expect(result).toEqual({ id, titulo: 'NestJS' });
      expect(subjectService.findById).toHaveBeenCalledWith(id);
    });
  });

  describe('update', () => {
    it('should update a subject', async () => {
      const dto: UpdateSubjectCommand = { title: 'NodeJs', keywords: 'NodeJs', status: SubjectStatus.IN_PROGRESS };
      const result = await controller.update(id, dto);
      expect(result).toEqual({ id, ...dto });
      expect(subjectService.update).toHaveBeenCalledWith(id, dto);
    });
  });

  describe('delete', () => {
    it('should delete a subject', async () => {
      await controller.delete(id);
      expect(subjectService.delete).toHaveBeenCalledWith(id);
    });
  });
});