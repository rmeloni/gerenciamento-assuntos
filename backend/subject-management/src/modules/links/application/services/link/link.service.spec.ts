import { Test, TestingModule } from '@nestjs/testing';
import { LinkService } from './link.service';
import { Link } from '../../../../links/domain/entities/link.entity';


describe('LinkService', () => {
  let service: LinkService;

  const mockLinkRepository = {
    create: jest.fn(),
    createBook: jest.fn(),
    deleteBySubjectId: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        LinkService,
        { provide: 'ILinkRepository', useValue: mockLinkRepository },
      ],
    }).compile();

    service = module.get<LinkService>(LinkService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a link', async () => {
      const linkData = new Link();
      linkData.link = 'http://nodejs.com';

      mockLinkRepository.create = jest.fn().mockResolvedValue(linkData);

      const result = await service.create(linkData);

      expect(mockLinkRepository.create).toHaveBeenCalledWith(linkData);
      expect(result).toEqual(linkData);
    });
  });

  describe('createBook', () => {
    it('should create multiple links', async () => {
      const linksData = [new Link(), new Link()];
      linksData[0].link = 'http://nestjs.com';
      linksData[1].link = 'http://dotnet.com';

      mockLinkRepository.createBook = jest.fn().mockResolvedValue(linksData);

      const result = await service.createBook(linksData);

      expect(mockLinkRepository.createBook).toHaveBeenCalledWith(linksData);
      expect(result).toEqual(linksData);
    });
  });

  describe('deleteBySubjectId', () => {
    it('should delete links by subject id', async () => {
      const subjectId = 'dd495561-be5a-458c-83c5-c517cf79657d';
      mockLinkRepository.deleteBySubjectId = jest.fn().mockResolvedValue(undefined);

      await service.deleteBySubjectId(subjectId);

      expect(mockLinkRepository.deleteBySubjectId).toHaveBeenCalledWith(subjectId);
    });
  });

});
