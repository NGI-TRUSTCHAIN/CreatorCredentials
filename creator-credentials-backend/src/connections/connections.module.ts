import { Module } from '@nestjs/common';
import { ConnectionsService } from './connections.service';
import { Connection } from './connection.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Connection])],
  exports: [ConnectionsService],
  providers: [ConnectionsService],
})
export class ConnectionsModule {}
