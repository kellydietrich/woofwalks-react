import { prop, getModelForClass } from "@typegoose/typegoose";

export class Visit {

  @prop({ required: true })
  public client!: string;

  @prop({ required: true })
  public walkerSelect!: number;

  @prop({ required: true })
  public pet!: string;

  @prop({ required: true })
  public status!: string;

  // add visitStartTime, dates
}

export const VisitModel = getModelForClass(Visit);