
import test from 'ava'
import { Books } from '../modules/books.js'

test('CREATEBOOKSTOCK    : Quantity should bigger than 1', async test => {
	test.plan(1)
	const book = await new Books()
	try {
		await book.createbookstock('unittestbook', 'unittestauthor', 'unittestisbnnum', 'unittestclassificationnum', '0','librarian1')
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
		await book.createbookstock('unittestbook', 'unittestauthor', 'unittestisbnnum', 'unittestclassificationnum', '100','librarian1')
		await book.deletebookstock('unittestisbnnum')
		test.fail('error not thrown')
	} catch(err) {
		test.is(err.message, 'Quantity should between 1 and 10', 'incorrect error message')
	} finally {
		book.close()
	}
})


