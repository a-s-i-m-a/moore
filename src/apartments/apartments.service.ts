import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Apartment, ApartmentDocument } from './apartment.model';

@Injectable()
export class ApartmentsService {
  constructor(
    @InjectModel(Apartment.name)
    private apartmentModel: Model<ApartmentDocument>,
  ) {}

  async getAllApartments(): Promise<Apartment[]> {
    return this.apartmentModel.find().exec();
  }

  async getApartmentById(id: string): Promise<Apartment> {
    const apartment = await this.apartmentModel.findById(id).exec();
    if (!apartment) {
      throw new NotFoundException('Apartment not found');
    }
    return apartment;
  }

  async createApartment(createApartment: Apartment): Promise<Apartment> {
    const createdApartment = new this.apartmentModel(createApartment);
    return createdApartment.save();
  }

  async updateApartment(
    id: string,
    updateApartment: Apartment,
  ): Promise<Apartment> {
    const updatedApartment = await this.apartmentModel
      .findByIdAndUpdate(id, updateApartment, { new: true })
      .exec();
    if (!updatedApartment) {
      throw new NotFoundException('Apartment not found');
    }
    return updatedApartment;
  }

  async deleteApartment(id: string): Promise<Apartment> {
    const deletedApartment = await this.apartmentModel
      .findByIdAndRemove(id)
      .exec();
    if (!deletedApartment) {
      throw new NotFoundException('Apartment not found');
    }
    return deletedApartment;
  }
}
