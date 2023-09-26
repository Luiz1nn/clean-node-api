import { MongoHelper } from '~/infra/db'
import { env } from './config'

MongoHelper.connect(env.mongoUrl)
  .then(async () => {
    const { setupApp } = await import('./config')
    const app = await setupApp()
    app.listen(env.port, () => console.log(`HTTP Server Running 🚀 at http://localhost:${env.port}`))
  })
  .catch(console.error)
