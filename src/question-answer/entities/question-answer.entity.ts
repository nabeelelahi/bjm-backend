import mongoose, { Schema } from 'mongoose';
import baseModel from '../../base/base.model';

export const name = 'question-asnwer';

export const schema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  parent: {
    type: String,
    ref: 'question-asnwer',
    default: null,
  },
  ...baseModel,
});

export const User = mongoose.model(name, schema);
