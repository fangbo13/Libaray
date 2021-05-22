
import Router from 'koa-router'

import { publicRouter } from './public.js'
import { secureRouter } from'./secure.js'
import { bookRouter} from './bookstocks.js'
import { librarianRouter } from './librarian.js'
import { borrowrecordRouter } from './borrowrecord.js'

const apiRouter = new Router()

const nestedRoutes = [publicRouter, secureRouter, bookRouter,librarianRouter,borrowrecordRouter]
for (const router of nestedRoutes) apiRouter.use(router.routes(), router.allowedMethods())

export { apiRouter }
