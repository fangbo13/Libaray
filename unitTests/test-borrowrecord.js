
import test from 'ava'
import { BorrowRecords } from '../modules/borrowrecords.js'
import { Books } from '../modules/books.js'


test('createborrowrecord    : book is not exist', async test => {
	test.plan(1)
	var borrowrecords = await new BorrowRecords()
	
	var books = await new Books()
	try {
		await books.createbookstock('unittestbook', 'unittestauthor', 'unittestisbnnum', 'unittestclassificationnum', '1','librarian1')
		await borrowrecords.createborrowrecord('unittesterror_uuid', 'student1')
		await books.deletebookstock('unittestisbnnum')
		test.fail('error not thrown')
	} catch(err) {
		test.is(err.message, 'book is not exist', 'incorrect error message')
	} finally {
		borrowrecords.close()
		books.close()
	}
})

test('createborrowrecord    : user is not exist', async test => {
	test.plan(1)
	var borrowrecords = await new BorrowRecords()
	var books = await new Books()
	try {
		await books.createbookstock('unittestbook', 'unittestauthor', 'unittestisbnnum', 'unittestclassificationnum', '1','librarian1')
		var book = await books.bookstockslistbyisbn('unittestisbnnum');
		await borrowrecords.createborrowrecord(book[0].uuid, 'unittesterrorstudent1')
		await books.deletebookstock('unittestisbnnum')
		test.fail('error not thrown')
	} catch(err) {
		console.log(err)
		test.is(err.message, 'book is not exist', 'incorrect error message')
	} finally {
		borrowrecords.close()
		books.close()
	}
})


test('createborrowrecord    : book is already borrowed', async test => {
	test.plan(1)
	var borrowrecords = await new BorrowRecords()
	var books = await new Books()
	try {
		await books.createbookstock('unittestbook', 'unittestauthor', 'unittestisbnnum', 'unittestclassificationnum', '1','librarian1')
		var book = await books.bookstockslistbyisbn('unittestisbnnum');
		await borrowrecords.createborrowrecord(book[0].uuid, 'student1')
		await borrowrecords.createborrowrecord(book[0].uuid, 'student1')
		await borrowrecords.deleteborrowrecord(book[0].uuid, 'student1')
		await books.deletebookstock('unittestisbnnum')
		test.fail('error not thrown')
	} catch(err) {
		test.is(err.message, 'book is not exist', 'incorrect error message')
	} finally {
		borrowrecords.close()
		books.close()
	}
})


