import { Test, TestingModule } from '@nestjs/testing';
import { SubjectService } from './subject.service';
import { ISubjectRepository } from '../../../domain/repositories/subject.repository';
import { ILinkService } from '../../../../links/domain/services/link.service';
import { GdeltService } from '../../../infrastructure/api/gdelt.service';
import { CreateSubjectCommand } from '../../commands/create-subject.command';
import { UpdateSubjectCommand } from '../../commands/update-subject.command';
import { NotFoundException } from '@nestjs/common';
import { Subject } from '../../../domain/entities/subject.entity';
import { SubjectStatus } from '../../../domain/entities/subject-status.enum';


describe('SubjectService', () => {
  let service: SubjectService;
  let subjectRepository: ISubjectRepository;
  let linkService: ILinkService;
  let gdeltService: GdeltService;

  const id = 'dd495561-be5a-458c-83c5-c517cf79657d';

  const mockSubjectRepository = {
    create: jest.fn().mockResolvedValue({}),
    findAll: jest.fn().mockResolvedValue([]),
    findById: jest.fn().mockResolvedValue({}),
    update: jest.fn().mockResolvedValue({}),
    delete: jest.fn(),
  };

  const mockLinkService = {
    deleteBySubjectId: jest.fn(),
    createBook: jest.fn().mockResolvedValue([]),
  };

  const mockGdeltService = {
    fetchLinks: jest.fn().mockResolvedValue('teste1,teste2,teste3\nteste4,teste5,teste6,teste7'),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SubjectService,
        {
          provide: 'ISubjectRepository',
          useValue: mockSubjectRepository,
        },
        {
          provide: 'ILinkService',
          useValue: mockLinkService,
        },
        {
          provide: GdeltService,
          useValue: mockGdeltService,
        },
      ],
    }).compile();

    service = module.get<SubjectService>(SubjectService);
    subjectRepository = module.get<ISubjectRepository>('ISubjectRepository');
    linkService = module.get<ILinkService>('ILinkService');
    gdeltService = module.get<GdeltService>(GdeltService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a new subject and fetch links', async () => {
      const command: CreateSubjectCommand = {
        title: 'NestJs',
        keywords: 'NestJs',
        status: SubjectStatus.PENDING
      };
      const subjectEntity = new Subject();
      subjectEntity.id = id;
      subjectEntity.title = command.title;
      subjectEntity.keywords = command.keywords;
      subjectEntity.links = [];

      mockSubjectRepository.create.mockResolvedValue(subjectEntity);
      mockGdeltService.fetchLinks.mockResolvedValue('teste1,teste2,teste3\nteste4,teste5,teste6,teste7');

      const result = await service.create(command);

      expect(mockSubjectRepository.create).toHaveBeenCalledWith(command);
      expect(mockGdeltService.fetchLinks).toHaveBeenCalledWith(command.keywords);
      expect(mockLinkService.createBook).toHaveBeenCalled();
      expect(result).toEqual({
        id: subjectEntity.id,
        title: subjectEntity.title,
        keywords: subjectEntity.keywords,
        status: subjectEntity.status,
        createdAt: subjectEntity.createdAt,
        updatedAt: subjectEntity.updatedAt,
        links: expect.any(Array),
      });
    });
  });

  describe('findAll', () => {
    it('should return an array of subjects', async () => {
      const subjects = [new Subject(), new Subject()];
      mockSubjectRepository.findAll.mockResolvedValue(subjects);

      const result = await service.findAll();

      expect(result).toHaveLength(2);
      expect(mockSubjectRepository.findAll).toHaveBeenCalled();
    });
  });

  describe('findById', () => {
    it('should return a subject by id', async () => {
      const subject = new Subject();
      subject.id = id;
      mockSubjectRepository.findById.mockResolvedValue(subject);

      const result = await service.findById(id);

      expect(result).toEqual(expect.objectContaining({ id: subject.id }));
      expect(mockSubjectRepository.findById).toHaveBeenCalledWith(id);
    });

    it('should throw NotFoundException if subject does not exist', async () => {
      mockSubjectRepository.findById.mockResolvedValue(null);

      await expect(service.findById('dd495561-be5a-458c-83c5-c517cf796566')).rejects.toThrow(NotFoundException);
    });
  });

  describe('update', () => {
    it('should update an existing subject', async () => {
      const updateCommand: UpdateSubjectCommand = {
        title: 'NestJS',
        keywords: 'NestJS',
        status: SubjectStatus.PENDING
      };
      const subjectEntity = new Subject();
      subjectEntity.id = id;
      subjectEntity.title = 'NodeJS';
      subjectEntity.keywords = 'NodeJS';
      subjectEntity.status = SubjectStatus.IN_PROGRESS

      mockSubjectRepository.findById.mockResolvedValue(subjectEntity);
      mockSubjectRepository.update.mockResolvedValue({ ...subjectEntity, ...updateCommand });
      mockGdeltService.fetchLinks.mockResolvedValue('teste1,teste2,teste3\nteste4,teste5,teste6,teste7');

      const result = await service.update(id, updateCommand);

      expect(mockSubjectRepository.findById).toHaveBeenCalledWith(id);
      expect(mockSubjectRepository.update).toHaveBeenCalledWith(id, updateCommand);
      expect(result.title).toBe(updateCommand.title);
    });
  });

  describe('delete', () => {
    it('should delete a subject by id', async () => {
      await service.delete(id);

      expect(linkService.deleteBySubjectId).toHaveBeenCalledWith(id);
      expect(mockSubjectRepository.delete).toHaveBeenCalledWith(id);
    });
  });

});
