import fastify from 'fastify'

const app = fastify()
app.listen({
  host: '0.0.0.0',
  port: 5050
}, () => console.log('Server Runnnig at http://localhost:5050 🚀'))
