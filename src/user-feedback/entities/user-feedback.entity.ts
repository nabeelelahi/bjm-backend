import mongoose, { Schema } from 'mongoose';
import baseModel from '../../base/base.model';
import { Role } from 'src/base/base.dto';

export const name = 'user-feedback';

export const schema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  image_url: {
    type: String,
    required: true,
  },
    user: {
      _id: {
        type: Schema.Types.ObjectId,
        ref: 'users',
        required: true,
      },
      role: {
        type: String,
        enum: [
          Role.ADMIN,
          Role.SUPERADMIN,
          Role.USER,
        ],
      },
      name: {
        type: String,
        required: true,
      },
      address: {
        type: String,
      },
      email: {
        type: String,
        required: true,
      },
      mobile_no: {
        type: String,
        required: true,
      },
      username: {
        type: String,
      },
    },
  ...baseModel,
});

export const User = mongoose.model(name, schema);
