
import Router from 'koa-router'
import bodyParser from 'koa-body'

const librarianRouter = new Router()
// librarianRouter.use(bodyParser({multipart:true}))

import { LibrarianAccounts } from '../modules/librarianaccounts.js'
import { BorrowRecords } from '../modules/borrowrecords.js'
const dbName = 'website.db'


librarianRouter.get('/librarianlogin', async ctx => {
	await ctx.render('librarianlogin', ctx.hbs)
})

librarianRouter.post('/librarianlogin', async ctx => {
	const account = await new LibrarianAccounts(dbName)
	ctx.hbs.body = ctx.request.body
	try {
		const body = ctx.request.body
		await account.login(body.user, body.pass)
		ctx.session.authorised = true
		ctx.session.usertype = 'librarian'
		ctx.session.user = body.user
		const referrer = body.referrer || '/bookstocks'
		return ctx.redirect(`${referrer}`)
	//	return ctx.redirect(`${referrer}?msg=you are now logged in...`)
	} catch(err) {
		ctx.hbs.msg = err.message
		await ctx.render('login', ctx.hbs)
	} finally {
		account.close()
	}
})

librarianRouter.get('/librarian/studentmanagement', async ctx => {
	const borrowrecords = await new BorrowRecords(dbName)
	let data = await borrowrecords.recordlist(ctx.hbs.borrower)
	return ctx.render('studentmanagement',data)
})


export { librarianRouter }
