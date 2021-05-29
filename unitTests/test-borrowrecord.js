
import test from 'ava'
import { BorrowRecords } from '../modules/borrowrecords.js'
import { Books } from '../modules/books.js'


test('createborrowrecord    : book is not exist', async test => {
	test.plan(1)
	const borrowrecords = await new BorrowRecords()
	try {
		await borrowrecords.createborrowrecord('error_uuid', 'student1')
		test.fail('error not thrown')
	} catch(err) {
		test.is(err.message, 'book is not exist', 'incorrect error message')
	} finally {
		borrowrecords.close()
	}
})


test('createborrowrecord    : book is already borrowed', async test => {
	test.plan(1)
	const borrowrecords = await new BorrowRecords()
	try {
		let book = borrowrecords.recordlist('student1');
		await borrowrecords.createborrowrecord(book[0].uuid, 'student1')
		test.fail('error not thrown')
	} catch(err) {
		test.is(err.message, 'book is already borrowed', 'incorrect error message')
	} finally {
		borrowrecords.close()
	}
})


