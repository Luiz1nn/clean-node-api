import type { HttpRequest, HttpResponse } from './http'

export interface Middleware {
  handle: (HttpRequest: HttpRequest) => Promise<HttpResponse>
}
