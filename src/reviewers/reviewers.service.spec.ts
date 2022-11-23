import { Test, TestingModule } from '@nestjs/testing';
import { Reviewer, ReviewerTest } from './entities/reviewer.entity';

import { ReviewersService } from './reviewers.service';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { CreateReviewerDto } from './dto/create-reviewer.dto';

const mockReviewerList = [
  new ReviewerTest({
    id: '1',
    name: 'Erik',
  }),
];

const mockCreateReviewer = new ReviewerTest({
  id: '2',
  name: 'Joao',
});

const mockCreateReviewerDto: CreateReviewerDto = {
  name: 'Joao',
};

describe('ReviewersService', () => {
  let reviewersRepository: Repository<Reviewer>;
  let reviewersService: ReviewersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ReviewersService],
      providers: [
        {
          provide: getRepositoryToken(Reviewer),
          useValue: {
            find: jest.fn().mockResolvedValue(mockReviewerList),
            findOneByOrFail: jest.fn().mockResolvedValue(mockCreateReviewer),
            save: jest.fn().mockResolvedValue(mockCreateReviewer),
            create: jest.fn().mockResolvedValue(mockCreateReviewerDto),
            remove: jest.fn().mockResolvedValue(undefined),
          },
        },
      ],
    }).compile();

    reviewersService = module.get<ReviewersService>(ReviewersService);
    reviewersRepository = module.get<Repository<Reviewer>>(
      getRepositoryToken(Reviewer),
    );
  });

  it('should be defined', () => {
    expect(reviewersRepository).toBeDefined();
    expect(reviewersService).toBeDefined();
  });

  describe('create', () => {
    it('should create an reviewer', async () => {
      const body: CreateReviewerDto = {
        name: 'Joao',
      };

      const reviewer = await reviewersService.create(body);

      expect(reviewer).toEqual(mockCreateReviewer);
      expect(reviewersRepository.create).toHaveBeenCalledTimes(1);
      expect(reviewersRepository.save).toHaveBeenCalledTimes(1);
    });
  });

  describe('findAll', () => {
    it('should return an array of reviewers', async () => {
      const reviewers = await reviewersService.findAll();

      expect(reviewers).toEqual(mockReviewerList);
      expect(reviewersRepository.find).toHaveBeenCalledTimes(1);
    });

    it('should throw an exception', async () => {
      jest
        .spyOn(reviewersRepository, 'find')
        .mockRejectedValueOnce(new Error());

      expect(reviewersService.findAll()).rejects.toThrowError();
    });
  });

  describe('findOne', () => {
    it('should return one reviewer', async () => {
      const reviewers = await reviewersService.findOne('2');

      expect(reviewers).toEqual(mockCreateReviewer);
      expect(reviewersRepository.findOneByOrFail).toHaveBeenCalledTimes(1);
    });
  });

  describe('delete', () => {
    it('should remove an reviewer', async () => {
      const reviewer = await reviewersService.remove('1');

      expect(reviewer).toBeUndefined();
      expect(reviewersRepository.findOneByOrFail).toHaveBeenCalledTimes(1);
      expect(reviewersRepository.remove).toHaveBeenCalledTimes(1);
    });
  });
});
