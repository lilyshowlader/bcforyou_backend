import { Profile } from "../models/profile.js"
import { Review } from "../models/review.js"


// CREATE REVIEW
const create = async (req, res) => {
  try {
    req.body.author = req.user.profile
    const review = await Review.create(req.body)
    const profile = await Profile.findByIdAndUpdate(
      req.user.profile,
      { $push: { reviews: review } },
      { new: true }
    )
    review.author = profile
    res.status(201).json(review)
  } catch (error) {
    console.log(error)
    res.status(500).json(error)
  }
}

// VIEW ALL REVIEWS
const index = async (req, res) => {
  try {
    const reviews = await Review.find({})
      .populate('author')
      .sort({ createdAt: 'desc' })
    res.status(200).json(reviews)
  } catch (error) {
    res.status(500).json(error)
  }
}

// VIEW A SINGLE REVIEW
const show = async (req, res) => {
  try {
    const review = await Review.findById(req.params.id)
      .populate('author')
    res.status(200).json(review)
  } catch (error) {
    res.status(500).json(error)
  }
}

// UDPATE A BLOG
const update = async (req, res) => {
  try {
    const review = await Review.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    ).populate('author')
    res.status(200).json(review)
  } catch (error) {
    res.status(500).json(error)
  }
}

// DELETE A BLOG
const deleteReview = async (req, res) => {
  try {
    const review = await Review.findByIdAndDelete(req.params.id)
    const profile = await Profile.findById(req.user.profile)
    profile.reviews.remove({ _id: req.params.id })
    await profile.save()
    res.status(200).json(review)
  } catch (error) {
    res.status(500).json(error)
  }
}

export {
  create,
  index,
  show,
  update,
  deleteReview as delete
}



