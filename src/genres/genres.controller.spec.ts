import { Test, TestingModule } from '@nestjs/testing';
import { GenresController } from './genres.controller';
import { GenresService } from './genres.service';
import { CreateGenreDto } from './dto/create-genre.dto';
import { GenreTest } from './entities/genre.entity';

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

describe('GenresController', () => {
  let genresController: GenresController;
  let genresService: GenresService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [GenresController],
      providers: [
        {
          provide: GenresService,
          useValue: {
            findAll: jest.fn().mockResolvedValue(mockGenresList),
            findOne: jest.fn().mockResolvedValue(mockCreateGenre),
            create: jest.fn().mockResolvedValue(mockCreateGenre),
            remove: jest.fn().mockResolvedValue(undefined),
          },
        },
      ],
    }).compile();

    genresService = module.get<GenresService>(GenresService);
    genresController = module.get<GenresController>(GenresController);
  });

  it('should be defined', () => {
    expect(genresController).toBeDefined();
    expect(genresService).toBeDefined();
  });

  describe('create', () => {
    it('should create an genre', async () => {
      const body: CreateGenreDto = {
        name: 'Drama',
      };

      const genre = await genresController.create(body);

      expect(genre).toEqual(mockCreateGenre);
      expect(genresService.create).toHaveBeenCalledTimes(1);
      expect(genresService.create).toHaveBeenCalledWith(body);
    });
  });

  describe('findAll', () => {
    it('should return an array of genres', async () => {
      const genres = await genresController.findAll();

      expect(genres).toEqual(mockGenresList);
      expect(genresService.findAll).toHaveBeenCalledTimes(1);
    });
  });

  describe('findOne', () => {
    it('should return one genre', async () => {
      const genres = await genresController.findOne('2');

      expect(genres).toEqual(mockCreateGenre);
      expect(genresService.findOne).toHaveBeenCalledTimes(1);
      expect(genresService.findOne).toHaveBeenCalledWith('2');
    });
  });

  describe('delete', () => {
    it('should remove an genre', async () => {
      const genre = await genresController.remove('1');

      expect(genre).toBeUndefined();
    });
  });
});
