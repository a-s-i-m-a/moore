import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Manager, ManagerDocument } from './manager.model';
import { plainToClass } from 'class-transformer';
import { ManagerDTO } from './manager.dto';
import { validate } from 'class-validator';

@Injectable()
export class ManagersService {
  constructor(
    @InjectModel(Manager.name) private managerModel: Model<ManagerDocument>,
  ) {}

  async getAllManagers(): Promise<Manager[]> {
    return this.managerModel.find().exec();
  }

  async getManagerById(id: string): Promise<Manager> {
    const manager = await this.managerModel.findById(id).exec();
    if (!manager) {
      throw new NotFoundException('Manager not found');
    }
    return manager;
  }

  async createManager(createManagerDto: ManagerDTO): Promise<Manager> {
    const manager = plainToClass(Manager, createManagerDto);

    const errors = await validate(manager);
    if (errors.length > 0) {
      const errorMessage = errors
        .map((error) => Object.values(error.constraints))
        .join(', ');
      throw new Error(errorMessage);
    }

    const createdManager = new this.managerModel(manager);
    return createdManager.save();
  }

  async updateManager(id: string, updateManager: Manager): Promise<Manager> {
    const updatedManager = await this.managerModel
      .findByIdAndUpdate(id, updateManager, { new: true })
      .exec();
    if (!updatedManager) {
      throw new NotFoundException('Manager not found');
    }
    return updatedManager;
  }

  async deleteManager(id: string): Promise<void> {
    const deletedManager = await this.managerModel.findByIdAndRemove(id).exec();
    if (!deletedManager) {
      throw new NotFoundException('Manager not found');
    }
  }
}
