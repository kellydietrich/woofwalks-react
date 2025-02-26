import { prop, getModelForClass } from "@typegoose/typegoose";

export class Pet {

  @prop({ required: true })
  public petName!: string;

  @prop({ required: true })
  public image!: string;

  @prop({ required: true })
  public breed!: string;

  @prop({ required: true })
  public client!: number;

  // to-do: add cloudinary id for image uploads
}

export const PetModel = getModelForClass(Pet);