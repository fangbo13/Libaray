
import Router from 'koa-router'

import { publicRouter } from './public.js'
import { secureRouter } from'./secure.js'
import { bookRouter} from './bookstocks.js'

const apiRouter = new Router()

const nestedRoutes = [publicRouter, secureRouter, bookRouter]
for (const router of nestedRoutes) apiRouter.use(router.routes(), router.allowedMethods())

export { apiRouter }
