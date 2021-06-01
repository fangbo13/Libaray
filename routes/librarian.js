
import Router from 'koa-router'

const librarianRouter = new Router()

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
		ctx.hbs.user = body.user
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
	const data = await borrowrecords.recordlist(ctx.hbs.borrower)
	ctx.hbs.data = data
	return ctx.render('studentmanagement',ctx.hbs)
})

librarianRouter.get('/librarian/searchuser', ctx => ctx.render('searchuser'))

export { librarianRouter }
