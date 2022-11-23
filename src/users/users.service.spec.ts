import { Test, TestingModule } from '@nestjs/testing';
import { User, UserTest } from './entities/user.entity';

import { UsersService } from './users.service';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { CreateUserDto } from './dto/create-user.dto';

const mockUsersList = [
  new UserTest({
    id: '1',
    firstName: 'Leonardo',
    lastName: 'DiCaprio',
    email: 'erikgnaa@gmail',
    password: 'Teste1234!',
  }),
];

const mockCreateUser = new UserTest({
  id: '2',
  firstName: 'Leonardo',
  lastName: 'DiCaprio',
  email: 'theds@gmail',
  password: 'Teste1234!',
});

const mockCreateUserDto: CreateUserDto = {
  firstName: 'Leonardo',
  lastName: 'DiCaprio',
  email: 'theds@gmail',
  password: 'Teste1234!',
};

describe('UsersService', () => {
  let usersRepository: Repository<User>;
  let usersService: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersService],
      providers: [
        {
          provide: getRepositoryToken(User),
          useValue: {
            find: jest.fn().mockResolvedValue(mockUsersList),
            findOneByOrFail: jest.fn().mockResolvedValue(mockCreateUser),
            save: jest.fn().mockResolvedValue(mockCreateUser),
            create: jest.fn().mockResolvedValue(mockCreateUserDto),
            remove: jest.fn().mockResolvedValue(undefined),
          },
        },
      ],
    }).compile();

    usersService = module.get<UsersService>(UsersService);
    usersRepository = module.get<Repository<User>>(getRepositoryToken(User));
  });

  it('should be defined', () => {
    expect(usersRepository).toBeDefined();
    expect(usersService).toBeDefined();
  });

  describe('create', () => {
    it('should create an user', async () => {
      const body: CreateUserDto = {
        firstName: 'Leonardo',
        lastName: 'DiCaprio',
        email: 'theds@gmail',
        password: 'Teste1234!',
      };

      const user = await usersService.create(body);

      expect(user).toEqual(mockCreateUser);
      expect(usersRepository.create).toHaveBeenCalledTimes(1);
      expect(usersRepository.save).toHaveBeenCalledTimes(1);
    });
  });

  describe('findAll', () => {
    it('should return an array of users', async () => {
      const users = await usersService.findAll();

      expect(users).toEqual(mockUsersList);
      expect(usersRepository.find).toHaveBeenCalledTimes(1);
    });

    it('should throw an exception', async () => {
      jest.spyOn(usersRepository, 'find').mockRejectedValueOnce(new Error());

      expect(usersService.findAll()).rejects.toThrowError();
    });
  });

  describe('findOne', () => {
    it('should return one user', async () => {
      const users = await usersService.findOne('2');

      expect(users).toEqual(mockCreateUser);
      expect(usersRepository.findOneByOrFail).toHaveBeenCalledTimes(1);
    });
  });

  describe('delete', () => {
    it('should remove an user', async () => {
      const user = await usersService.remove('1');

      expect(user).toBeUndefined();
      expect(usersRepository.findOneByOrFail).toHaveBeenCalledTimes(1);
      expect(usersRepository.remove).toHaveBeenCalledTimes(1);
    });
  });
});
