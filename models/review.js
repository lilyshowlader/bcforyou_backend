import mongoose from 'mongoose'

const Schema = mongoose.Schema

const reviewSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    text: {
      type: String,
      required: true,
    },
    author: { type: Schema.Types.ObjectId, ref: 'Profile' }
  },
  { timestamps: true }
)

const Review = mongoose.model('Review', reviewSchema)

export { Review }