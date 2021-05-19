import Router from 'koa-router'
import bodyParser from 'koa-body'

const bookRouter = new Router()
bookRouter.use(bodyParser({multipart:true}))

// import {Books} from '../modules/books.js'
const dbName = 'websit.db'

/**
 * The book list page.
 * 
 * @name Book list
 * @route {GET} /
 */

bookRouter.get('/bookstocks', async ctx =>{
	try{
		//let booklistSQL = `SELECT * FROM`
		await ctx.render('bookstocks', ctx.hbs)
	}catch(err){
		await ctx.render('error',ctx.hbs);
	}
})

export { bookRouter}