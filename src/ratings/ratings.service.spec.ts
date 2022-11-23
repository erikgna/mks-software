import { Test, TestingModule } from '@nestjs/testing';
import { Rating, RatingTest } from './entities/rating.entity';

import { RatingsService } from './ratings.service';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';

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

describe('RatingsService', () => {
  let ratingsRepository: Repository<Rating>;
  let ratingsService: RatingsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RatingsService],
      providers: [
        {
          provide: getRepositoryToken(Rating),
          useValue: {
            find: jest.fn().mockResolvedValue(mockRatingsList),
            findOneByOrFail: jest.fn().mockResolvedValue(mockCreateRating),
            remove: jest.fn().mockResolvedValue(undefined),
          },
        },
      ],
    }).compile();

    ratingsService = module.get<RatingsService>(RatingsService);
    ratingsRepository = module.get<Repository<Rating>>(
      getRepositoryToken(Rating),
    );
  });

  it('should be defined', () => {
    expect(ratingsRepository).toBeDefined();
    expect(ratingsService).toBeDefined();
  });

  describe('findAll', () => {
    it('should return an array of ratings', async () => {
      const ratings = await ratingsService.findAll();

      expect(ratings).toEqual(mockRatingsList);
      expect(ratingsRepository.find).toHaveBeenCalledTimes(1);
    });

    it('should throw an exception', async () => {
      jest.spyOn(ratingsRepository, 'find').mockRejectedValueOnce(new Error());

      expect(ratingsService.findAll()).rejects.toThrowError();
    });
  });

  describe('findOne', () => {
    it('should return one rating', async () => {
      const ratings = await ratingsService.findOne('2');

      expect(ratings).toEqual(mockCreateRating);
      expect(ratingsRepository.findOneByOrFail).toHaveBeenCalledTimes(1);
    });
  });

  describe('delete', () => {
    it('should remove an rating', async () => {
      const rating = await ratingsService.remove('1');

      expect(rating).toBeUndefined();
      expect(ratingsRepository.findOneByOrFail).toHaveBeenCalledTimes(1);
      expect(ratingsRepository.remove).toHaveBeenCalledTimes(1);
    });
  });
});
