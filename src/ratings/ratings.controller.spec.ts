import { Test, TestingModule } from '@nestjs/testing';
import { RatingsController } from './ratings.controller';
import { RatingsService } from './ratings.service';
import { RatingTest } from './entities/rating.entity';

const mockRatingsList = [
  new RatingTest({
    id: '1',
    stars: 4,
  }),
];

const mockCreateRating = new RatingTest({
  id: '2',
  stars: 4,
});

describe('RatingsController', () => {
  let ratingsController: RatingsController;
  let ratingsService: RatingsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RatingsController],
      providers: [
        {
          provide: RatingsService,
          useValue: {
            findAll: jest.fn().mockResolvedValue(mockRatingsList),
            findOne: jest.fn().mockResolvedValue(mockCreateRating),
            remove: jest.fn().mockResolvedValue(undefined),
          },
        },
      ],
    }).compile();

    ratingsService = module.get<RatingsService>(RatingsService);
    ratingsController = module.get<RatingsController>(RatingsController);
  });

  it('should be defined', () => {
    expect(ratingsController).toBeDefined();
    expect(ratingsService).toBeDefined();
  });

  describe('findAll', () => {
    it('should return an array of ratings', async () => {
      const ratings = await ratingsController.findAll();

      expect(ratings).toEqual(mockRatingsList);
      expect(ratingsService.findAll).toHaveBeenCalledTimes(1);
    });
  });

  describe('findOne', () => {
    it('should return one rating', async () => {
      const ratings = await ratingsController.findOne('2');

      expect(ratings).toEqual(mockCreateRating);
      expect(ratingsService.findOne).toHaveBeenCalledTimes(1);
      expect(ratingsService.findOne).toHaveBeenCalledWith('2');
    });
  });

  describe('delete', () => {
    it('should remove an rating', async () => {
      const rating = await ratingsController.remove('1');

      expect(rating).toBeUndefined();
    });
  });
});
