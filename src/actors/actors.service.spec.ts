import { Test, TestingModule } from '@nestjs/testing';
import { Actor, ActorTest } from './entities/Actor.entity';

import { ActorsService } from './Actors.service';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { CreateActorDto } from './dto/create-actor.dto';

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

const mockCreateActorDto: CreateActorDto = {
  firstName: 'Leonardo',
  lastName: 'DiCaprio',
  gender: 'M',
};

describe('ActorsService', () => {
  let actorsRepository: Repository<Actor>;
  let actorsService: ActorsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ActorsService],
      providers: [
        {
          provide: getRepositoryToken(Actor),
          useValue: {
            find: jest.fn().mockResolvedValue(mockActorsList),
            findOneByOrFail: jest.fn().mockResolvedValue(mockCreateActor),
            save: jest.fn().mockResolvedValue(mockCreateActor),
            create: jest.fn().mockResolvedValue(mockCreateActorDto),
            remove: jest.fn().mockResolvedValue(undefined),
          },
        },
      ],
    }).compile();

    actorsService = module.get<ActorsService>(ActorsService);
    actorsRepository = module.get<Repository<Actor>>(getRepositoryToken(Actor));
  });

  it('should be defined', () => {
    expect(actorsRepository).toBeDefined();
    expect(actorsService).toBeDefined();
  });

  describe('create', () => {
    it('should create an actor', async () => {
      const body: CreateActorDto = {
        firstName: 'Leonardo',
        lastName: 'DiCaprio',
        gender: 'M',
      };

      const actor = await actorsService.create(body);

      expect(actor).toEqual(mockCreateActor);
      expect(actorsRepository.create).toHaveBeenCalledTimes(1);
      expect(actorsRepository.save).toHaveBeenCalledTimes(1);
    });
  });

  describe('findAll', () => {
    it('should return an array of actors', async () => {
      const actors = await actorsService.findAll();

      expect(actors).toEqual(mockActorsList);
      expect(actorsRepository.find).toHaveBeenCalledTimes(1);
    });

    it('should throw an exception', async () => {
      jest.spyOn(actorsRepository, 'find').mockRejectedValueOnce(new Error());

      expect(actorsService.findAll()).rejects.toThrowError();
    });
  });

  describe('findOne', () => {
    it('should return one actor', async () => {
      const actors = await actorsService.findOne('2');

      expect(actors).toEqual(mockCreateActor);
      expect(actorsRepository.findOneByOrFail).toHaveBeenCalledTimes(1);
    });
  });

  describe('delete', () => {
    it('should remove an actor', async () => {
      const actor = await actorsService.remove('1');

      expect(actor).toBeUndefined();
      expect(actorsRepository.findOneByOrFail).toHaveBeenCalledTimes(1);
      expect(actorsRepository.remove).toHaveBeenCalledTimes(1);
    });
  });
});
