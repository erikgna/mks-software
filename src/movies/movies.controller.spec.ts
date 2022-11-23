import { Test, TestingModule } from '@nestjs/testing';
import { MoviesController } from './movies.controller';
import { MoviesService } from './movies.service';

describe('MoviesController', () => {
  let mvoiesController: MoviesController;
  let moviesService: MoviesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MoviesController],
      providers: [
        {
          provide: MoviesService,
          useValue: [],
        },
      ],
    }).compile();

    moviesService = module.get<MoviesService>(MoviesService);
    mvoiesController = module.get<MoviesController>(MoviesController);
  });

  it('should be defined', () => {
    expect(mvoiesController).toBeDefined();
    expect(moviesService).toBeDefined();
  });
});
