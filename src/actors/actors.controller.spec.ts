import { Test, TestingModule } from '@nestjs/testing';
import { ActorsController } from './Actors.controller';
import { ActorsService } from './Actors.service';
import { CreateActorDto } from './dto/create-actor.dto';
import { ActorTest } from './entities/actor.entity';

const mockActorsList = [
  new ActorTest({
    id: '1',
    firstName: 'Leonardo',
    lastName: 'DiCaprio',
    gender: 'M',
  }),
];

const mockCreateActor = new ActorTest({
  id: '2',
  firstName: 'Leonardo',
  lastName: 'DiCaprio',
  gender: 'M',
});

describe('ActorsController', () => {
  let actorsController: ActorsController;
  let actorsService: ActorsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ActorsController],
      providers: [
        {
          provide: ActorsService,
          useValue: {
            findAll: jest.fn().mockResolvedValue(mockActorsList),
            findOne: jest.fn().mockResolvedValue(mockCreateActor),
            create: jest.fn().mockResolvedValue(mockCreateActor),
            remove: jest.fn().mockResolvedValue(undefined),
          },
        },
      ],
    }).compile();

    actorsService = module.get<ActorsService>(ActorsService);
    actorsController = module.get<ActorsController>(ActorsController);
  });

  it('should be defined', () => {
    expect(actorsController).toBeDefined();
    expect(actorsService).toBeDefined();
  });

  describe('create', () => {
    it('should create an actor', async () => {
      const body: CreateActorDto = {
        firstName: 'Leonardo',
        lastName: 'DiCaprio',
        gender: 'M',
      };

      const actor = await actorsController.create(body);

      expect(actor).toEqual(mockCreateActor);
      expect(actorsService.create).toHaveBeenCalledTimes(1);
      expect(actorsService.create).toHaveBeenCalledWith(body);
    });
  });

  describe('findAll', () => {
    it('should return an array of actors', async () => {
      const actors = await actorsController.findAll();

      expect(actors).toEqual(mockActorsList);
      expect(actorsService.findAll).toHaveBeenCalledTimes(1);
    });
  });

  describe('findOne', () => {
    it('should return one actor', async () => {
      const actors = await actorsController.findOne('2');

      expect(actors).toEqual(mockCreateActor);
      expect(actorsService.findOne).toHaveBeenCalledTimes(1);
      expect(actorsService.findOne).toHaveBeenCalledWith('2');
    });
  });

  describe('delete', () => {
    it('should remove an actor', async () => {
      const actor = await actorsController.remove('1');

      expect(actor).toBeUndefined();
    });
  });
});
