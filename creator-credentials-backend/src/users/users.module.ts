import { Module, forwardRef } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { CredentialsService } from 'src/credentials/credentials.service';
import { CredentialsModule } from 'src/credentials/credentials.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    forwardRef(() => CredentialsModule),
  ],
  exports: [UsersService],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
