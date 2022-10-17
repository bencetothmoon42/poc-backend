import { Module } from '@nestjs/common';
import { MockKafkaService } from './kafka.service';

@Module({
  providers: [MockKafkaService],
})
export class MockKafkaModule {}
