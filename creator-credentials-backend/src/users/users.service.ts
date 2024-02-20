import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './user.entity';
import { users } from '@clerk/clerk-sdk-node';
import { CredentialsService } from 'src/credentials/credentials.service';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private credentialsService: CredentialsService,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const newUser = new User();
    newUser.clerkId = createUserDto.clerkId;
    newUser.clerkRole = createUserDto.clerkRole;

    const user = await this.userRepository.save(newUser, { reload: true });
    const userFromClerk = await users.getUser(createUserDto.clerkId);

    const email = userFromClerk.emailAddresses[0].emailAddress;

    await this.credentialsService.createEmailCredential(
      { email, did: email },
      user,
    );
    return user;
  }

  async getByClerkId(clerkId: string): Promise<User> {
    return this.userRepository.findOne({ where: { clerkId } });
  }
}
