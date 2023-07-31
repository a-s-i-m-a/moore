import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
} from '@nestjs/common';
import { ManagersService } from './managers.service';
import { ManagerDTO } from './manager.dto';

@Controller('managers')
export class ManagersController {
  constructor(private readonly managersService: ManagersService) {}

  @Get()
  async getAllManagers(): Promise<ManagerDTO[]> {
    return this.managersService.getAllManagers();
  }

  @Get(':id')
  async getManagerById(@Param('id') id: string): Promise<ManagerDTO> {
    return this.managersService.getManagerById(id);
  }

  @Post()
  async createManager(
    @Body() createManagerDto: ManagerDTO,
  ): Promise<ManagerDTO> {
    return this.managersService.createManager(createManagerDto);
  }

  @Put(':id')
  async updateManager(
    @Param('id') id: string,
    @Body() updateManagerDto: ManagerDTO,
  ): Promise<ManagerDTO> {
    return this.managersService.updateManager(id, updateManagerDto);
  }

  @Delete(':id')
  async deleteManager(@Param('id') id: string): Promise<void> {
    return this.managersService.deleteManager(id);
  }
}
