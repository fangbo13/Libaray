
import test from 'ava'
import { Books } from '../modules/books.js'

test('CREATEBOOKSTOCK    : invalid quantity of book', async test => {
	test.plan(1)
	const book = await new Books()
	try {
		await book.createbookstock('testbook', 'testauthor', 'testisbnnum', '0','testuser')
		test.fail('error not thrown')
	} catch(err) {
		test.is(err.message, 'Ivalid quantity of book', 'incorrect error message')
	} finally {
		book.close()
	}
})


