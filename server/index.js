import express from "express"
const app = express()

import dotenv from "dotenv"
import morgan from "morgan"
import colors from "colors"
import helmet from "helmet"

import connectDB from "./config/db.js"

// Routes
import userRoutes from "./routes/usersRoutes.js"
import postRoutes from "./routes/postRoutes.js"

dotenv.config()

connectDB()

if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'))
}

app.use(express.json()) // Body Parser for post request
app.use(helmet()) // Protect exposed request

// Routes
app.use("/api/users", userRoutes)
app.use("/api/posts", postRoutes)


if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '/frontend/build')))
  
    app.get('*', (req, res) =>
      res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'))
    )
  } else {
    app.get('/', (req, res) => {
      res.send('API is running....')
    })
}


const PORT = process.env.PORT || 8800

app.listen(PORT, () => {
    console.log(`Server is running in ${process.env.NODE_ENV} on port ${PORT}`.yellow.bold)
})