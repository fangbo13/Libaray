
import Router from 'koa-router'
import bodyParser from 'koa-body'

const borrowrecordRouter = new Router()
borrowrecordRouter.use(bodyParser({multipart:true}))

import { BorrowRecords } from '../modules/borrowrecords.js'

const dbName = 'website.db'

/**
 * The secure home page.
 *
 * @name Home Page
 * @route {GET} /
 */

borrowrecordRouter.get('/borrowrecord', async ctx =>{
	console.log(ctx.hbs.usertype)

			const item = await new BorrowRecords(dbName)
			try{
				let data = await item.recordlist()
				await ctx.render('borrowrecord', data)
			}catch(err){
				throw err
				await ctx.render('error',ctx.hbs)
			}
	
})


export { borrowrecordRouter }
