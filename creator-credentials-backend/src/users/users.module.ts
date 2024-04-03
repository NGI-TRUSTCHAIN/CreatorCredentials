import { Module, forwardRef } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { CredentialsModule } from 'src/credentials/credentials.module';
import { HttpModule } from '@nestjs/axios';
import { ConnectionsModule } from 'src/connections/connections.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    forwardRef(() => CredentialsModule),
    forwardRef(() => ConnectionsModule),
    HttpModule,
  ],
  exports: [UsersService],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
