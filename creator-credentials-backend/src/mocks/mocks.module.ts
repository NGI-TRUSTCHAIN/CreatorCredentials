import { Module } from '@nestjs/common';
import { MocksController } from './mocks.controller';

@Module({
  // imports: [DatabaseModule],
  controllers: [MocksController],
})
export class MocksModule {}
