
import Router from 'koa-router'

const borrowrecordRouter = new Router({ prefix: '/borrowrecord' })

import { BorrowRecords } from '../modules/borrowrecords.js'

const dbName = 'website.db'

/**
 * Student's borrow record list.
 *
 * @name Borrow Record List
 * @route {GET} /borrowrecord
 */

borrowrecordRouter.get('/', async ctx => {
	console.log(ctx.hbs.usertype)

	const item = await new BorrowRecords(dbName)
	try{
		const data = await item.recordlist(ctx.session.user)
		ctx.hbs.data = data
		console.log(ctx.hbs)
		await ctx.render('borrowrecord', ctx.hbs)
	} catch(err) {
		ctx.hbs.msg=err
		await ctx.render('borrowrecord',ctx.hbs)
	}

})

borrowrecordRouter.get('/borrowbook', async ctx => {
	await ctx.render('borrowbook', ctx.hbs)
})

/**
 * Student borrow book
 *
 * @name Borrow Book
 * @route {POST} /borrowrecord
 */
borrowrecordRouter.post('/', async ctx => {
	const borrowrecord = await new BorrowRecords(dbName)
	try{
		await borrowrecord.createborrowrecord(ctx.request.body.book_uuid,ctx.request.body.borrower)
		ctx.redirect(`/librarian/studentmanagement?borrower=${ctx.request.body.borrower}&msg=Borrow book success`)
	}catch(err) {
		ctx.redirect(`/borrowrecord/borrowbook?msg=${err}`)
	}
})

borrowrecordRouter.post('/returnbook', async ctx => {
	const borrowrecord = await new BorrowRecords(dbName)
	try{
		await borrowrecord.deleteborrowrecord(
			ctx.request.body.book_uuid,
			ctx.request.body.borrower)
		ctx.redirect(`/librarian/studentmanagement?borrower=${ctx.request.body.borrower}`)
	}catch(err) {
		ctx.hbs.msg = err
		ctx.redirect(`/librarian/studentmanagement?borrower=${ctx.request.body.borrower}`)
	}
})

export { borrowrecordRouter }
