import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
} from '@nestjs/common';
import { ApartmentsService } from './apartments.service';
import { ApartmentDTO } from './apartment.dto';

@Controller('apartments')
export class ApartmentsController {
  constructor(private readonly apartmentsService: ApartmentsService) {}

  @Get()
  async getAllApartments(): Promise<ApartmentDTO[]> {
    return this.apartmentsService.getAllApartments();
  }

  @Get(':id')
  async getApartmentById(@Param('id') id: string): Promise<ApartmentDTO> {
    return this.apartmentsService.getApartmentById(id);
  }

  @Post()
  async createApartment(
    @Body() createApartmentDto: ApartmentDTO,
  ): Promise<ApartmentDTO> {
    return this.apartmentsService.createApartment(createApartmentDto);
  }

  @Put(':id')
  async updateApartment(
    @Param('id') id: string,
    @Body() updateApartmentDto: ApartmentDTO,
  ): Promise<ApartmentDTO> {
    return this.apartmentsService.updateApartment(id, updateApartmentDto);
  }

  @Delete(':id')
  async deleteApartment(@Param('id') id: string): Promise<ApartmentDTO> {
    return this.apartmentsService.deleteApartment(id);
  }
}
