import { Module } from '@nestjs/common';
import { DatabaseOptionsService } from './database.options.service';

@Module({
  providers: [DatabaseOptionsService],
  exports: [DatabaseOptionsService],
  imports: [],
  controllers: [],
})
export class DatabaseOptionsModule {}
