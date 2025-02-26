import { prop, getModelForClass } from "@typegoose/typegoose";

export class Report {

  @prop({ required: true })
  public body!: string;

  @prop({ required: true })
  public petId!: number;

  @prop({ required: true })
  public visitId!: string;

  @prop({ required: true })
  public image!: string;

  @prop({ required: true })
  public numberOne!: string;
  
  @prop({ required: true })
  public numberTwo!: string;

  // to-do: add cloudinaryId for image uploads
}

export const ReportModel = getModelForClass(Report);