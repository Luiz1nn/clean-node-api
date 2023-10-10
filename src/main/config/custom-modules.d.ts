declare module Express {
  interface Request {
    accountId?: string
  }
}

declare var __MONGO_URI__: string
