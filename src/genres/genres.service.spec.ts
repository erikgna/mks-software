import { Test, TestingModule } from '@nestjs/testing';
import { Genre, GenreTest } from './entities/genre.entity';

import { GenresService } from './genres.service';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { CreateGenreDto } from './dto/create-genre.dto';

const mockGenresList = [
  new GenreTest({
    id: '1',
    name: 'Romance',
  }),
];

const mockCreateGenre = new GenreTest({
  id: '2',
  name: 'Drama',
});

const mockCreateGenreDto: CreateGenreDto = {
  name: 'Romance',
};

describe('GenresService', () => {
  let genresRepository: Repository<Genre>;
  let genresService: GenresService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [GenresService],
      providers: [
        {
          provide: getRepositoryToken(Genre),
          useValue: {
            find: jest.fn().mockResolvedValue(mockGenresList),
            findOneByOrFail: jest.fn().mockResolvedValue(mockCreateGenre),
            save: jest.fn().mockResolvedValue(mockCreateGenre),
            create: jest.fn().mockResolvedValue(mockCreateGenreDto),
            remove: jest.fn().mockResolvedValue(undefined),
          },
        },
      ],
    }).compile();

    genresService = module.get<GenresService>(GenresService);
    genresRepository = module.get<Repository<Genre>>(getRepositoryToken(Genre));
  });

  it('should be defined', () => {
    expect(genresRepository).toBeDefined();
    expect(genresService).toBeDefined();
  });

  describe('create', () => {
    it('should create an genre', async () => {
      const body: CreateGenreDto = {
        name: 'Drama',
      };

      const genre = await genresService.create(body);

      expect(genre).toEqual(mockCreateGenre);
      expect(genresRepository.create).toHaveBeenCalledTimes(1);
      expect(genresRepository.save).toHaveBeenCalledTimes(1);
    });
  });

  describe('findAll', () => {
    it('should return an array of genres', async () => {
      const genres = await genresService.findAll();

      expect(genres).toEqual(mockGenresList);
      expect(genresRepository.find).toHaveBeenCalledTimes(1);
    });

    it('should throw an exception', async () => {
      jest.spyOn(genresRepository, 'find').mockRejectedValueOnce(new Error());

      expect(genresService.findAll()).rejects.toThrowError();
    });
  });

  describe('findOne', () => {
    it('should return one genre', async () => {
      const genres = await genresService.findOne('2');

      expect(genres).toEqual(mockCreateGenre);
      expect(genresRepository.findOneByOrFail).toHaveBeenCalledTimes(1);
    });
  });

  describe('delete', () => {
    it('should remove an genre', async () => {
      const genre = await genresService.remove('1');

      expect(genre).toBeUndefined();
      expect(genresRepository.findOneByOrFail).toHaveBeenCalledTimes(1);
      expect(genresRepository.remove).toHaveBeenCalledTimes(1);
    });
  });
});
