import sqlite from 'sqlite-async'

class BorrowRecords{
	constructor(dbName = ':memory:'){
		return (async() => {
			this.db = await sqlite.open(dbName)
			let sql = 'CREATE TABLE IF NOT EXISTS borrow_records\
						(`id` Integer Primary KEY AUTOINCREMENT,\
						 `book_uuid` VARCHAR(256) NOT NULL,\
							`borrower` VARCHAR(128) NOT NULL,\
							`start_time` DATE NOT NULL,\
							`deadline` DATE NOT NULL);'
			let dbbuild = await this.db.run(sql)
// 			console.log(sql + dbbuild)
			return this
		})()
	}
	
	async recordlist(user){
		let sql = `SELECT s.title,s.author,s.isbn_num,r.borrower,r.deadline FROM borrow_records r, book_stocks s \
							where r.borrower = '${user}' \
							and   r.book_uuid = s.uuid;`
		console.log(sql)

		const data = await this.db.all(sql)
		console.log(data)
		return data
	}
	
	/*
	 * Create book borrow record by submited information
	 * 
	 * @param {uuid} uuid of book
	 * @returns {Boolean} returns true if the new bookstocks has been added
	 * 
	 */ 
	async createborrowrecord(isbn_num,borrower){
// 		Array.from(arguments).forEach(val =>{
// 			if(val.length === 0) throw new Error('missing field')
// 		})
		let sqlavailabe = `SELECT s.uuid FROM book_stocks s WHERE isbn_num = '${isbn_num}' AND NOT EXISTS (SELECT * FROM borrow_records where book_uuid = s.uuid);`
		console.log(`sqlavailabe=${sqlavailabe}`)
		let available = await this.db.get(sqlavailabe)
		console.log(`available=${available}`)
		
		let starttime = new Date().toUTCString()
		let deadline = new Date(new Date().getTime() + 30 * 24 * 60 * 60 * 1000)
		let sqlcreaterecord = `INSERT INTO borrow_records (book_uuid,borrower,start_time,deadline) VALUES\
												  ('${available.uuid}','${borrower}','${starttime}','${deadline}');`
		console.log(sqlcreaterecord)
		await this.db.run(sqlcreaterecord)
		return true
	}
	
		async close() {
		await this.db.close()
	}
	
}

export { BorrowRecords }