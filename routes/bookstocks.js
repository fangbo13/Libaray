import Router from 'koa-router'
import bodyParser from 'koa-body'

const bookRouter = new Router()
bookRouter.use(bodyParser({multipart:true}))

import {Books} from '../modules/books.js'
const dbName = 'websit.db'

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

export { bookRouter}