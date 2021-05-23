
import Router from 'koa-router'
import bodyParser from 'koa-body'

const bookRouter = new Router({ prefix: '/bookstocks' })
// bookRouter.use(bodyParser({multipart:true}))

import { Books } from '../modules/books.js'
import { BorrowRecords } from '../modules/borrowrecords.js'

const dbName = 'website.db'

/**
 * The book list page.
 * 
 * @name Book list
 * @route {GET} /bookstocks
 */
bookRouter.get('/', async ctx =>{
// 	if(ctx.hbs.usertype !== 'librarian'){
// 		ctx.hbs.error = 'Unauthorized to enter the librarian page'
// 		await ctx.render('error', ctx.hbs)
// 	}else{
			const books = await new Books(dbName)
			try{
				let bookstocks = await books.bookstockslist()
				await ctx.render('bookstocks', bookstocks)
			}catch(err){
				throw err
				await ctx.render('error',ctx.hbs)
			}
// 	}
})


/**
 * Student search bookstocks by titile or author
 * 
 * @name Available book stocks
 * @route {GET} /bookstocks/availablebookstocks
 *
 */
bookRouter.get('/availablebookstocks', async ctx => {
	const books = await new Books(dbName)
	try{
		let result = await books.searchbookstocks(ctx.hbs.searchitem)
		await ctx.render('searchstocks',result)
	}catch(err){
		throw err
	}
})

/**
 * Librarian type book stocks info
 * 
 * @name Add stocks
 * @route {GET} /bookstocks/addstocks
 */  
bookRouter.get('/addstocks', async ctx =>{
	try{
		await ctx.render('addbookstock',ctx.hbs)
	}catch(err){
		throw err
	}
})

/**
 * Librarian submit book stocks info
 * 
 * @name Submit stock
 * @route {POST} /bookstocks/submitstock
 */
bookRouter.post('/submitstock', async ctx =>{
	const books = await new Books(dbName)
	try{
		await books.createbookstock(
			ctx.request.body.title,
			ctx.request.body.author,
			ctx.request.body.isbnnum,
			ctx.request.body.classificationnum,
			ctx.request.body.quantity,
		  "create_user")
		await ctx.redirect('/bookstocks')
	}catch(err){
		throw err
	}
})


export { bookRouter }