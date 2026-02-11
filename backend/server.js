import path from 'path'
import express from 'express'
import dotenv from 'dotenv'
import rateLimit from 'express-rate-limit'
import connectDB from './config/db.js'
import cookieParser from 'cookie-parser'
import { notFound, errorHandler } from './middleware/errorMiddleware.js'
import userRoutes from './routes/userRoutes.js'
import taskRoutes from './routes/taskRoutes.js'


dotenv.config()

const port = process.env.PORT || 5000

// Connect Database
connectDB()

const app = express()
// Rate limiter (protect from abuse)
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // max requests per IP
})

app.use(limiter)


// Body parser
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Cookie parser
app.use(cookieParser())

// Routes
app.use('/api/users', userRoutes)
app.use('/api/tasks', taskRoutes)

// Production setup
if (process.env.NODE_ENV === 'production') {
  const __dirname = path.resolve()

  app.use(express.static(path.join(__dirname, '/frontend/dist')))

  app.get('*', (req, res) =>
    res.sendFile(
      path.resolve(__dirname, 'frontend', 'dist', 'index.html')
    )
  )
} else {
  app.get('/', (req, res) => {
    res.send('API is running....')
  })
}

// Error handling
app.use(notFound)
app.use(errorHandler)

// Start server
app.listen(port, () => {
  console.log(`Server started on port ${port}`)
})
