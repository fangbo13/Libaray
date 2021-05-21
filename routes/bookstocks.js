import Router from 'koa-router'
import bodyParser from 'koa-body'

const bookRouter = new Router()
bookRouter.use(bodyParser({multipart:true}))

import {Books} from '../modules/books.js'
const dbName = 'website.db'

/**
 * The book list page.
 * 
 * @name Book list
 * @route {GET} /
 */

bookRouter.get('/bookstocks', async ctx =>{
	const books = await new Books(dbName)
	try{
		let bookstocks = await books.bookstockslist()
		await ctx.render('bookstocks', bookstocks)
	}catch(err){
		throw err
		await ctx.render('error',ctx.hbs)
	}
})

bookRouter.get('/addstocks', async ctx =>{
	try{
		await ctx.render('addbookstock',ctx.hbs)
	}catch(err){
		throw err
	}
})

bookRouter.post('/submitstock', async ctx =>{
	let books = await new Books(dbName)
	try{
		await books.createstock(
			ctx.body.title,
			ctx.body.author,
			ctx.body.isbn_num,
			ctx.body.classification_num,
			ctx.body.quantity,
		  create_user)
		await ctx.redirect('/bookstocks')
	}catch(err){
		throw err
	}
})

export { bookRouter}