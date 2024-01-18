import { Router } from 'express'
import * as reviewsCtrl from '../controllers/reviews.js'
import { decodeUserFromToken, checkAuth } from '../middleware/auth.js'

const router = Router()

// ========== Public Routes ===========




// ========= Protected Routes ========= 
router.use(decodeUserFromToken)

// CREATE REVIEWS
router.post('/', checkAuth, reviewsCtrl.create)
// VIEW ALL REVIEWS
router.get('/', checkAuth, reviewsCtrl.index)
// VIEW A SINGLE REVIEW
router.get('/:id', checkAuth, reviewsCtrl.show)
// UPDATE A REVIEW
router.put('/:id', checkAuth, reviewsCtrl.update)
// DELETE A REVIEW
router.delete('/:id', checkAuth, reviewsCtrl.delete)






export { router }