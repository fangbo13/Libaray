
import Router from 'koa-router'

const publicRouter = new Router()

import { Accounts } from '../modules/accounts.js'
const dbName = 'website.db'

/**
 * The secure home page.
 *
 * @name Home Page
 * @route {GET} /
 */
publicRouter.get('/', async ctx => {
	try {
		await ctx.render('index', ctx.hbs)
	} catch(err) {
		await ctx.render('error', ctx.hbs)
	}
})

/**
 * The user registration page.
 *
 * @name Register Page
 * @route {GET} /register
 */
publicRouter.get('/register', async ctx => await ctx.render('register'))

/**
 * The script to process new user registrations.
 *
 * @name Register Script
 * @route {POST} /register
 */
publicRouter.post('/register', async ctx => {
	const account = await new Accounts(dbName)
	try {
		// call the functions in the module
		await account.register(ctx.request.body.user, ctx.request.body.pass, ctx.request.body.email)
		ctx.redirect(`/login?msg=new user "${ctx.request.body.user}" added, you need to log in`)
	} catch(err) {
		ctx.hbs.msg = err.message
		ctx.hbs.body = ctx.request.body
		console.log(ctx.hbs)
		await ctx.render('register', ctx.hbs)
	} finally {
		account.close()
	}
})

publicRouter.get('/postregister', async ctx => await ctx.render('validate'))

publicRouter.get('/validate/:user/:token', async ctx => {
	try {
		console.log('VALIDATE')
		console.log(`URL --> ${ctx.request.url}`)
		if(!ctx.request.url.includes('.css')) {
			console.log(ctx.params)
			const milliseconds = 1000
			const now = Math.floor(Date.now() / milliseconds)
			const account = await new Accounts(dbName)
			await account.checkToken(ctx.params.user, ctx.params.token, now)
			ctx.hbs.msg = `account "${ctx.params.user}" has been validated`
			await ctx.render('login', ctx.hbs)
		}
	} catch(err) {
		await ctx.render('login', ctx.hbs)
	}
})

publicRouter.get('/login', async ctx => {
	console.log(ctx.hbs)
	await ctx.render('login', ctx.hbs)
})

publicRouter.post('/login', async ctx => {
	const account = await new Accounts(dbName)
	ctx.hbs.body = ctx.request.body
	try {
		const body = ctx.request.body
		await account.login(body.user, body.pass)
		ctx.session.authorised = true
		ctx.session.usertype = 'student'
		ctx.session.user = body.user
		ctx.hbs.user = body.user
		const referrer = body.referrer || '/borrowrecord'
		return ctx.redirect(`${referrer}`)
	//	return ctx.redirect(`${referrer}?msg=you are now logged in...`)
	} catch(err) {
		ctx.hbs.msg = err.message
		await ctx.render('login', ctx.hbs)
	} finally {
		account.close()
	}
})

publicRouter.get('/logout', async ctx => {
	ctx.session.authorised = null
	ctx.redirect('/?msg=you are now logged out')
})


// publicRouter.post('/submitstock', async ctx =>{
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

// publicRouter.post('/librarianlogin', async ctx => {
// 	const account = await new LibrarianAccounts(dbName)
// 	ctx.hbs.body = ctx.request.body
// 	try {
// 		const body = ctx.request.body
// 		await account.login(body.user, body.pass)
// 		ctx.session.authorised = true
// 		ctx.session.usertype = 'librarian'
// 		const referrer = body.referrer || '/bookstocks'
// 		return ctx.redirect(`${referrer}`)
// 	//	return ctx.redirect(`${referrer}?msg=you are now logged in...`)
// 	} catch(err) {
// 		ctx.hbs.msg = err.message
// 		await ctx.render('login', ctx.hbs)
// 	} finally {
// 		account.close()
// 	}
// })


export { publicRouter }
