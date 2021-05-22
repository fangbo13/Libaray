
import Router from 'koa-router'
import bodyParser from 'koa-body'

const bookRouter = new Router()
bookRouter.use(bodyParser({multipart:true}))

import { Books } from '../modules/books.js'
import { BorrowRecords } from '../modules/borrowrecords.js'

const dbName = 'website.db'

/**
 * The book list page.
 * 
 * @name Book list
 * @route {GET} /
 */

bookRouter.get('/bookstocks', async ctx =>{
	console.log(ctx.hbs.usertype)
	if(ctx.hbs.usertype !== 'librarian'){
		ctx.hbs.error = 'Unauthorized to enter the librarian page'
		await ctx.render('error', ctx.hbs)
	}else{
			const books = await new Books(dbName)
			try{
				let bookstocks = await books.bookstockslist()
				await ctx.render('bookstocks', bookstocks)
			}catch(err){
				throw err
				await ctx.render('error',ctx.hbs)
			}
	}
})

bookRouter.get('/addstocks', async ctx =>{
	try{
		await ctx.render('addbookstock',ctx.hbs)
	}catch(err){
		throw err
	}
})

// bookRouter.post('/submitstock', async ctx =>{
// console.log(ctx.request.body.title)
// console.log(ctx.request.body.author)
// console.log(ctx.request.body.isbnnum)
// console.log(ctx.request.body.classificationnum)
// console.log(ctx.request.body.quantity)	
// 	let books = await new Books(dbName)
//  	console.log(ctx.request.body)
// 	try{
// 		await books.createbookstock(
// 			ctx.request.body.title,
// 			ctx.request.body.author,
// 			ctx.request.body.isbnnum,
// 			ctx.request.body.classificationnum,
// 			ctx.request.body.quantity,
// 		  "create_user")
// 		await ctx.redirect('/bookstocks')
// 	}catch(err){
// 		throw err
// 	}
// })

bookRouter.get('/borrowrecord', async ctx =>{
	console.log(ctx.hbs.usertype)

			const books = await new Books(dbName)
			try{
				let bookstocks = await books.recordlist()
				await ctx.render('borrowrecord', bookstocks)
			}catch(err){
				throw err
				await ctx.render('error',ctx.hbs)
			}
	
})

export { bookRouter }