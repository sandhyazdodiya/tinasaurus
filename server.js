import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import { TinaNodeBackend, LocalBackendAuthProvider } from '@tinacms/datalayer'
import database from './tina/database.js' // Imports your MongoDB/GitHub database config

dotenv.config()
const app = express()

app.use(cors())
app.use(express.json())

// Determine if we are in local development fallback mode
const isLocal = process.env.NODE_ENV === 'development'

const tinaBackend = TinaNodeBackend({
  authProvider: LocalBackendAuthProvider(), // Use Auth.js or NextAuth here for production login
  database: database,
})

// Setup the GQL endpoint
app.all('/api/tina/*', async (req, res) => {
  try {
    await tinaBackend(req, res)
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: error.message })
  }
})

const PORT = process.env.PORT || 4000
app.listen(PORT, () => {
  console.log(`TinaCMS MongoDB Backend running on http://localhost:${PORT}`)
})
