import { createDatabase, TinaNodeBackend } from '@tinacms/datalayer'
import { MongodbLevel } from 'mongodb-level'
import { GitHubProvider } from 'tinacms-gitprovider-github'

// 1. Setup your MongoDB Database Adapter
const databaseAdapter = new MongodbLevel({
  collectionName: 'tinacms',
  dbName: 'tinacms',
  mongoUri: process.env.MONGODB_URI,
})

// 2. Setup your GitHub Git Provider for production saves
const gitProvider = new GitHubProvider({
  branch: process.env.GITHUB_BRANCH || 'main',
  owner: process.env.GITHUB_OWNER,
  repo: process.env.GITHUB_REPO,
  token: process.env.GITHUB_PERSONAL_ACCESS_TOKEN,
})

export default createDatabase({
  databaseAdapter,
  gitProvider,
})
