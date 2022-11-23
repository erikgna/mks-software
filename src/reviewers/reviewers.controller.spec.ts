import { Test, TestingModule } from '@nestjs/testing';
import { ReviewersController } from './reviewers.controller';
import { ReviewersService } from './reviewers.service';
import { CreateReviewerDto } from './dto/create-reviewer.dto';
import { ReviewerTest } from './entities/reviewer.entity';

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

describe('ReviewersController', () => {
  let reviewersController: ReviewersController;
  let reviewersService: ReviewersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ReviewersController],
      providers: [
        {
          provide: ReviewersService,
          useValue: {
            findAll: jest.fn().mockResolvedValue(mockReviewerList),
            findOne: jest.fn().mockResolvedValue(mockCreateReviewer),
            create: jest.fn().mockResolvedValue(mockCreateReviewer),
            remove: jest.fn().mockResolvedValue(undefined),
          },
        },
      ],
    }).compile();

    reviewersService = module.get<ReviewersService>(ReviewersService);
    reviewersController = module.get<ReviewersController>(ReviewersController);
  });

  it('should be defined', () => {
    expect(reviewersController).toBeDefined();
    expect(reviewersService).toBeDefined();
  });

  describe('create', () => {
    it('should create an reviewer', async () => {
      const body: CreateReviewerDto = {
        name: 'Joao',
      };

      const reviewer = await reviewersController.create(body);

      expect(reviewer).toEqual(mockCreateReviewer);
      expect(reviewersService.create).toHaveBeenCalledTimes(1);
      expect(reviewersService.create).toHaveBeenCalledWith(body);
    });
  });

  describe('findAll', () => {
    it('should return an array of reviewers', async () => {
      const reviewers = await reviewersController.findAll();

      expect(reviewers).toEqual(mockReviewerList);
      expect(reviewersService.findAll).toHaveBeenCalledTimes(1);
    });
  });

  describe('findOne', () => {
    it('should return one reviewer', async () => {
      const reviewers = await reviewersController.findOne('2');

      expect(reviewers).toEqual(mockCreateReviewer);
      expect(reviewersService.findOne).toHaveBeenCalledTimes(1);
      expect(reviewersService.findOne).toHaveBeenCalledWith('2');
    });
  });

  describe('delete', () => {
    it('should remove an reviewer', async () => {
      const reviewer = await reviewersController.remove('1');

      expect(reviewer).toBeUndefined();
    });
  });
});
