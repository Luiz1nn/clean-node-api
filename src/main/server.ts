import { app } from './config'

app
  .listen({
    host: '0.0.0.0',
    port: 5050
  },
  () => console.log('HTTP Server Running 🚀'))
