import { ConflictException, Injectable } from '@nestjs/common';
import { UserDto } from './user.dto';
import { hashSync } from 'bcrypt';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'src/db/entities/user-entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly usersRepository: Repository<UserEntity>,
  ) {}

  async create(newUser: UserDto) {
    const userAlrealdyRegistered = await this.findByUsername(newUser.username);

    if (userAlrealdyRegistered) {
      throw new ConflictException(
        `User ${newUser.username} already registered`,
      );
    }

    const dbUser = new UserEntity();
    dbUser.username = newUser.username;
    dbUser.passwordHash = hashSync(newUser.password, 10);

    const { id, username } = await this.usersRepository.save(dbUser);

    return {
      id,
      username,
    };
  }

  async findByUsername(username: string): Promise<UserDto | null> {
    const userFound = await this.usersRepository.findOne({
      where: {
        username,
      },
    });

    if (!userFound) {
      return null;
    }

    return {
      id: userFound.id,
      username: userFound.username,
      password: userFound.passwordHash,
    };
  }
}
