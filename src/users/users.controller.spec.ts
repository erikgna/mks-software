import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UserTest } from './entities/user.entity';

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
describe('UsersController', () => {
  let usersController: UsersController;
  let usersService: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        {
          provide: UsersService,
          useValue: {
            findAll: jest.fn().mockResolvedValue(mockUsersList),
            findOne: jest.fn().mockResolvedValue(mockCreateUser),
            create: jest.fn().mockResolvedValue(mockCreateUser),
            remove: jest.fn().mockResolvedValue(undefined),
          },
        },
      ],
    }).compile();

    usersService = module.get<UsersService>(UsersService);
    usersController = module.get<UsersController>(UsersController);
  });

  it('should be defined', () => {
    expect(usersController).toBeDefined();
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

      const user = await usersController.create(body);

      expect(user).toEqual(mockCreateUser);
      expect(usersService.create).toHaveBeenCalledTimes(1);
      expect(usersService.create).toHaveBeenCalledWith(body);
    });
  });

  describe('findAll', () => {
    it('should return an array of users', async () => {
      const users = await usersController.findAll();

      expect(users).toEqual(mockUsersList);
      expect(usersService.findAll).toHaveBeenCalledTimes(1);
    });
  });

  describe('findOne', () => {
    it('should return one user', async () => {
      const users = await usersController.findOne('2');

      expect(users).toEqual(mockCreateUser);
      expect(usersService.findOne).toHaveBeenCalledTimes(1);
      expect(usersService.findOne).toHaveBeenCalledWith('2');
    });
  });

  describe('delete', () => {
    it('should remove an user', async () => {
      const user = await usersController.remove('1');

      expect(user).toBeUndefined();
    });
  });
});
