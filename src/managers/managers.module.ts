import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ManagersController } from './managers.controller';
import { ManagersService } from './managers.service';
import { Manager, ManagerSchema } from './manager.model';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Manager.name, schema: ManagerSchema }]),
  ],
  controllers: [ManagersController],
  providers: [ManagersService],
})
export class ManagersModule {}
