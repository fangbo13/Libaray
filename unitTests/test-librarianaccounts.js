
import test from 'ava'
import { LibrarianAccounts } from '../modules/librarianaccounts.js'

test('LOGIN    : invalid username', async test => {
	test.plan(1)
	const account = await new LibrarianAccounts()
	try {
		await account.login('librarian1111', 'password')
		test.fail('error not thrown')
	} catch(err) {
		test.is(err.message, 'username "roej" not found', 'incorrect error message')
	} finally {
		account.close()
	}
})

test('LOGIN    : invalid password', async test => {
	test.plan(1)
	const account = await new LibrarianAccounts()
	try {
		await account.login('librarian1', 'errp455w0rd')
		test.fail('error not thrown')
	} catch(err) {
		test.is(err.message, 'invalid password for account "librarian1"', 'incorrect error message')
	} finally {
		account.close()
	}
})
