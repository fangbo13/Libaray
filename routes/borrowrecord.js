
import Router from 'koa-router'
import bodyParser from 'koa-body'

const borrowrecordRouter = new Router({ prefix: '/borrowrecord' })
// borrowrecordRouter.use(bodyParser({multipart:true}))

import { BorrowRecords } from '../modules/borrowrecords.js'

const dbName = 'website.db'

/**
 * Student's borrow record list.
 *
 * @name Borrow Record List
 * @route {GET} /borrowrecord
 */

borrowrecordRouter.get('/', async ctx =>{
	console.log(ctx.hbs.usertype)

			const item = await new BorrowRecords(dbName)
			try{
				let data = await item.recordlist(ctx.session.user)
				ctx.hbs.data = data
				console.log(ctx.hbs)
				await ctx.render('borrowrecord', ctx.hbs)
			}catch(err){
				ctx.hbs.msg=err
				await ctx.render('borrowrecord',ctx.hbs)
			}
	
})

/**
 * Student borrow book
 * 
 * @name Borrow Book
 * @route {POST} /borrowrecord
 */
borrowrecordRouter.post('/', async ctx =>{
	const borrowrecord = await new BorrowRecords(dbName)
	try{
		let data = await borrowrecord.createborrowrecord(ctx.request.body.isbn_num,ctx.session.user)
		ctx.redirect('/borrowrecord')
	}catch(err){
		throw err
	}
})

borrowrecordRouter.post('/returnbook', async ctx =>{
	const borrowrecord = await new BorrowRecords(dbName)
	try{
		let data = await borrowrecord.deleteborrowrecord(
			ctx.request.body.uuid,
			ctx.request.body.borrower)
		ctx.redirect(`/librarian/studentmanagement?borrower=${ctx.request.body.borrower}`)
	}catch(err){
		throw err
	}
})

export { borrowrecordRouter }
