
import test from 'ava'
import { Books } from '../modules/books.js'

test('CREATEBOOKSTOCK    : Quantity should bigger than 1', async test => {
	test.plan(1)
	const book = await new Books()
	try {
		await book.createbookstock(
			{
				title: 'unittestbook',
			  author: 'unittestauthor',
			  isbnnum: 'unittestisbnnum',
			  classificationnum: 'unittestclassificationnum',
			  quantity: '0',
		    user: 'librarian1'
			})
		await book.deletebookstock('unittestisbnnum')
		test.fail('error not thrown')
	} catch(err) {
		test.is(err.message, 'Quantity should between 1 and 10', 'incorrect error message')
	} finally {
		book.close()
	}
})

test('CREATEBOOKSTOCK    : Quantity should smaller than 10', async test => {
	test.plan(1)
	const book = await new Books()
	try {
		await book.createbookstock(
			{
				title: 'unittestbook',
			  author: 'unittestauthor',
			  isbnnum: 'unittestisbnnum',
			  classificationnum: 'unittestclassificationnum',
			  quantity: '100',
		    user: 'librarian1'
			})
		await book.deletebookstock('unittestisbnnum')
		test.fail('error not thrown')
	} catch(err) {
		test.is(err.message, 'Quantity should between 1 and 10', 'incorrect error message')
	} finally {
		book.close()
	}
})


