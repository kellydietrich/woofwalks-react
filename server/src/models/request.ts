import { prop, getModelForClass } from "@typegoose/typegoose";

enum SomeEnum {
    Accepted = "ACCEPTED",
    Pending = "PENDING",
    Completed = "COMPLETED",
    Canceled = "CANCELED",
}


export class Request {

  @prop({ required: true })
  public bio!: string;

  @prop({ required: true })
  public image!: string;

  @prop({ required: true })
  public favBreeds!: string;

  @prop({ required: true })
  public cloudinaryId!: string;

  // Add User Ref & CreatedAt
}

export const RequestModel = getModelForClass(Request);