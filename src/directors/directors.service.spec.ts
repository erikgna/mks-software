import { Test, TestingModule } from '@nestjs/testing';
import { Director, DirectorTest } from './entities/director.entity';

import { DirectorsService } from './directors.service';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { CreateDirectorDto } from './dto/create-director.dto';

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

const mockCreateDirectorDto: CreateDirectorDto = {
  firstName: 'Leonardo',
  lastName: 'DiCaprio',
};

describe('DirectorsService', () => {
  let directorsRepository: Repository<Director>;
  let directorsService: DirectorsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DirectorsService],
      providers: [
        {
          provide: getRepositoryToken(Director),
          useValue: {
            find: jest.fn().mockResolvedValue(mockDirectorsList),
            findOneByOrFail: jest.fn().mockResolvedValue(mockCreateDirector),
            save: jest.fn().mockResolvedValue(mockCreateDirector),
            create: jest.fn().mockResolvedValue(mockCreateDirectorDto),
            remove: jest.fn().mockResolvedValue(undefined),
          },
        },
      ],
    }).compile();

    directorsService = module.get<DirectorsService>(DirectorsService);
    directorsRepository = module.get<Repository<Director>>(
      getRepositoryToken(Director),
    );
  });

  it('should be defined', () => {
    expect(directorsRepository).toBeDefined();
    expect(directorsService).toBeDefined();
  });

  describe('create', () => {
    it('should create an director', async () => {
      const body: CreateDirectorDto = {
        firstName: 'Leonardo',
        lastName: 'DiCaprio',
      };

      const director = await directorsService.create(body);

      expect(director).toEqual(mockCreateDirector);
      expect(directorsRepository.create).toHaveBeenCalledTimes(1);
      expect(directorsRepository.save).toHaveBeenCalledTimes(1);
    });
  });

  describe('findAll', () => {
    it('should return an array of directors', async () => {
      const directors = await directorsService.findAll();

      expect(directors).toEqual(mockDirectorsList);
      expect(directorsRepository.find).toHaveBeenCalledTimes(1);
    });

    it('should throw an exception', async () => {
      jest
        .spyOn(directorsRepository, 'find')
        .mockRejectedValueOnce(new Error());

      expect(directorsService.findAll()).rejects.toThrowError();
    });
  });

  describe('findOne', () => {
    it('should return one director', async () => {
      const directors = await directorsService.findOne('2');

      expect(directors).toEqual(mockCreateDirector);
      expect(directorsRepository.findOneByOrFail).toHaveBeenCalledTimes(1);
    });
  });

  describe('delete', () => {
    it('should remove an director', async () => {
      const director = await directorsService.remove('1');

      expect(director).toBeUndefined();
      expect(directorsRepository.findOneByOrFail).toHaveBeenCalledTimes(1);
      expect(directorsRepository.remove).toHaveBeenCalledTimes(1);
    });
  });
});
