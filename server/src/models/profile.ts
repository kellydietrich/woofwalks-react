import { prop, getModelForClass } from "@typegoose/typegoose";

export class Profile {

  @prop({ required: true })
  public bio!: string;

  @prop({ required: true })
  public image!: number;

  @prop({ required: true })
  public favBreeds!: string;

  @prop({ required: true })
  public user!: string;

  //to-do: add cloudinary id for image uploads
}

export const ProfileModel = getModelForClass(Profile);