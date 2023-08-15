import { MongoHelper } from '~/infra'
import { env } from './config'

MongoHelper.connect(env.mongoUrl)
  .then(async () => {
    const app = (await import('./config')).app
    app.listen(env.port, () => console.log(`HTTP Server Running 🚀 at http://localhost:${env.port}`))
  })
  .catch(console.error)
