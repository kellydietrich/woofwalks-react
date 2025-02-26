import { prop, getModelForClass } from "@typegoose/typegoose";

export class Game {

  @prop({ required: true })
  public name!: string;

  @prop({ required: true })
  public price!: number;

  @prop({ required: true })
  public category!: string;
}

export const GameModel = getModelForClass(Game);