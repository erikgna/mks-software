import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) {}

  create(createUserDto: CreateUserDto) {
    return this.usersRepository.save(
      this.usersRepository.create(createUserDto),
    );
  }

  findAll() {
    return this.usersRepository.find({
      select: [
        'id',
        'email',
        'firstName',
        'lastName',
        'createdAt',
        'updatedAt',
      ],
    });
  }

  findOne(email: string) {
    return this.usersRepository.findOneByOrFail({ email });
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const userToUpdate = await this.usersRepository.findOneByOrFail({ id });

    return this.usersRepository.save({
      ...userToUpdate,
      ...updateUserDto,
    });
  }

  async remove(id: string) {
    const userToRemove = await this.usersRepository.findOneByOrFail({ id });

    return this.usersRepository.remove(userToRemove);
  }
}
