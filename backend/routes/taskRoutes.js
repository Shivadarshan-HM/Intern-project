import express from 'express'
import Task from '../models/Task.js'
import { protect } from '../middleware/authMiddleware.js'

const router = express.Router()

// Get tasks
router.get('/', protect, async (req, res) => {
  const tasks = await Task.find({ user: req.user._id })
  res.json(tasks)
})

// Create task
router.post('/', protect, async (req, res) => {
  const { title } = req.body

  if (!title) {
    res.status(400)
    throw new Error('Title is required')
  }

  const task = await Task.create({
    user: req.user._id,
    title,
  })

  res.status(201).json(task)
})

// Delete task
router.delete('/:id', protect, async (req, res) => {
  await Task.findByIdAndDelete(req.params.id)
  res.json({ message: 'Deleted' })
})

export default router
