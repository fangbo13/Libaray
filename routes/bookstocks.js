
import Router from 'koa-router'

const bookRouter = new Router({ prefix: '/bookstocks' })

import { Books } from '../modules/books.js'

const dbName = 'website.db'

/**
 * The book list page.
 *
 * @name Book list
 * @route {GET} /bookstocks
 */
bookRouter.get('/', async ctx => {
// 	if(ctx.hbs.usertype !== 'librarian'){
// 		ctx.hbs.error = 'Unauthorized to enter the librarian page'
// 		await ctx.render('error', ctx.hbs)
// 	}else{
	const books = await new Books(dbName)
	try{
		const bookstocks = await books.bookstockslist()
		await ctx.render('bookstocks', bookstocks)
	}catch(err) {
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
		const result = await books.searchbookstocks(ctx.hbs.searchitem)
		await ctx.render('searchstocks',result)
	}catch(err) {
		throw err
	}
})

/**
 * Librarian type book stocks info
 *
 * @name Add stocks
 * @route {GET} /bookstocks/addstocks
 */
bookRouter.get('/addstocks', async ctx => {
	try{
		await ctx.render('addbookstock',ctx.hbs)
	}catch(err) {
		throw err
	}
})

/**
 * Librarian submit book stocks info
 *
 * @name Submit stock
 * @route {POST} /bookstocks/submitstock
 */
bookRouter.post('/submitstock', async ctx => {
	const books = await new Books(dbName)
	try{
		await books.createbookstock(
			{
				title: ctx.request.body.title,
			  author: ctx.request.body.author,
			  isbnnum: ctx.request.body.isbnnum,
			  classificationnum: ctx.request.body.classificationnum,
			  quantity: ctx.request.body.quantity,
		    user: ctx.session.user
			}
		)
		await ctx.redirect('/bookstocks')
	}catch(err) {
		return ctx.redirect(`/bookstocks/addstocks?msg=${err}`)
	}
})


export { bookRouter }
