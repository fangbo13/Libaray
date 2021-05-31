
import bcrypt from 'bcrypt-promise'
import sqlite from 'sqlite-async'

const saltRounds = 10

class LibrarianAccounts {

	constructor(dbName = ':memory:') {
		return (async() => {
			this.db = await sqlite.open(dbName)
			// we need this table to store the user accounts
			const sql = 'CREATE TABLE IF NOT EXISTS librarians\
				(id INTEGER PRIMARY KEY AUTOINCREMENT, user TEXT, pass TEXT, email TEXT);'
			await this.db.run(sql)

			try{
				const pass = await bcrypt.hash('p455w0rd', saltRounds)
				const sql2 = `INSERT INTO librarians (user,pass,email) VALUES \
											 ("librarian1","${pass}","fangh13@coventry.ac.uk") \
											,("librarian2","${pass}","fangh13@coventry.ac.uk");`
				const initresult = await this.db.run(sql2)
// 				console.log(sql2 + initresult)
			}catch(err) {
				console.log(`add init data error, ${err}`)
			}

			return this
		})()
	}


	/**
	 * checks to see if a set of login credentials are valid
	 * @param {String} username the username to check
	 * @param {String} password the password to check
	 * @returns {Boolean} returns true if credentials are valid
	 */
	async login(username, password) {
		let sql = `SELECT count(id) AS count FROM librarians WHERE user="${username}";`
		const records = await this.db.get(sql)
		if(!records.count) throw new Error(`username "${username}" not found`)
		sql = `SELECT pass FROM librarians WHERE user = "${username}";`
		const record = await this.db.get(sql)
		const valid = await bcrypt.compare(password, record.pass)
		if(valid === false) throw new Error(`invalid password for account "${username}"`)
		return true
	}

	async close() {
		await this.db.close()
	}
}

export { LibrarianAccounts }
