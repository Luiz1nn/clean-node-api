import { notFound, unauthorized, serverError, badRequest, forbidden } from './components/index'
import { apiKeyAuthSchema } from './schemas/index'

export default {
  securitySchemes: {
    apiKeyAuth: apiKeyAuthSchema
  },
  badRequest,
  notFound,
  serverError,
  unauthorized,
  forbidden
}
