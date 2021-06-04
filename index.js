
import Koa from 'koa'
import serve from 'koa-static'
import views from 'koa-views'
import session from 'koa-session'
import koaBody from 'koa-body'
import dayjs from 'dayjs'
import customParseFormat from 'dayjs/plugin/customParseFormat.js'


import { apiRouter } from './routes/routes.js'

import handlebars from 'handlebars'
handlebars.registerHelper({
	'overdue': function(a,options) {
		dayjs.extend(customParseFormat)
		if(dayjs().isAfter(dayjs(a,'DD/MM/YYYY'))) {
			return options.fn(this)
		}else{
			return options.inverse(this)
		}
	}
})
const app = new Koa()
app.keys = ['darkSecret']

const defaultPort = 8080
const port = process.env.PORT || defaultPort


app.use(serve('public'))
app.use(session(app))
app.use(views('views', { extension: 'handlebars' }, {map: { handlebars: 'handlebars' }}))

app.use(koaBody({multipart: true}))

app.use( async(ctx, next) => {
	console.log(`${ctx.method} ${ctx.path}`)
	ctx.hbs = {
		authorised: ctx.session.authorised,
		usertype: ctx.session.usertype,
		user: ctx.session.user,
		host: `https://${ctx.host}`
	}
	for(const key in ctx.query) ctx.hbs[key] = ctx.query[key]
	await next()
})

app.use(apiRouter.routes(), apiRouter.allowedMethods())

app.listen(port, async() => console.log(`listening on port ${port}`))
