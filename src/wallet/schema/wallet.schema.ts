import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

export type WalletDocument = HydratedDocument<Wallet>;

@Schema({ timestamps: true, versionKey: false })
export class Wallet {
  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  userId: Types.ObjectId;

  @Prop({ type: Map, of: Number, default: {} })
  balance: Map<string, number>;
}

export const WalletSchema = SchemaFactory.createForClass(Wallet);
