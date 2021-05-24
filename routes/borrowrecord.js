
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
				await ctx.render('borrowrecord', data)
			}catch(err){
				throw err
				await ctx.render('error',ctx.hbs)
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


export { borrowrecordRouter }
