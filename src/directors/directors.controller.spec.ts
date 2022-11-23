import { Test, TestingModule } from '@nestjs/testing';
import { DirectorsController } from './directors.controller';
import { DirectorsService } from './directors.service';
import { CreateDirectorDto } from './dto/create-director.dto';
import { DirectorTest } from './entities/director.entity';

const mockDirectorsList = [
  new DirectorTest({
    id: '1',
    firstName: 'Leonardo',
    lastName: 'DiCaprio',
  }),
];

const mockCreateDirector = new DirectorTest({
  id: '2',
  firstName: 'Leonardo',
  lastName: 'DiCaprio',
});

describe('DirectorsController', () => {
  let directorsController: DirectorsController;
  let directorsService: DirectorsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DirectorsController],
      providers: [
        {
          provide: DirectorsService,
          useValue: {
            findAll: jest.fn().mockResolvedValue(mockDirectorsList),
            findOne: jest.fn().mockResolvedValue(mockCreateDirector),
            create: jest.fn().mockResolvedValue(mockCreateDirector),
            remove: jest.fn().mockResolvedValue(undefined),
          },
        },
      ],
    }).compile();

    directorsService = module.get<DirectorsService>(DirectorsService);
    directorsController = module.get<DirectorsController>(DirectorsController);
  });

  it('should be defined', () => {
    expect(directorsController).toBeDefined();
    expect(directorsService).toBeDefined();
  });

  describe('create', () => {
    it('should create an director', async () => {
      const body: CreateDirectorDto = {
        firstName: 'Leonardo',
        lastName: 'DiCaprio',
      };

      const director = await directorsController.create(body);

      expect(director).toEqual(mockCreateDirector);
      expect(directorsService.create).toHaveBeenCalledTimes(1);
      expect(directorsService.create).toHaveBeenCalledWith(body);
    });
  });

  describe('findAll', () => {
    it('should return an array of directors', async () => {
      const directors = await directorsController.findAll();

      expect(directors).toEqual(mockDirectorsList);
      expect(directorsService.findAll).toHaveBeenCalledTimes(1);
    });
  });

  describe('findOne', () => {
    it('should return one director', async () => {
      const directors = await directorsController.findOne('2');

      expect(directors).toEqual(mockCreateDirector);
      expect(directorsService.findOne).toHaveBeenCalledTimes(1);
      expect(directorsService.findOne).toHaveBeenCalledWith('2');
    });
  });

  describe('delete', () => {
    it('should remove an director', async () => {
      const director = await directorsController.remove('1');

      expect(director).toBeUndefined();
    });
  });
});
