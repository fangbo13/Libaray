import sqlite from 'sqlite-async'

class BorrowRecords{
	constructor(dbName = ':memory:'){
		return (async() => {
			this.db = await sqlite.open(dbName)
			const sql = 'CREATE TABLE IF NOT EXISTS borrow_records\
						(`id` Integer Primary KEY AUTOINCREMENT,\
						 `book_uuid` VARCHAR(256) NOT NULL,\
							`borrower` VARCHAR(128) NOT NULL,\
							`start_time` DATE NOT NULL,\
							`deadline` DATE NOT NULL);'
			const dbbuild = await this.db.run(sql)
// 			console.log(sql + dbbuild)
			return this
		})()
	}
	
	async recordlist(){
				//test
		let book = [{
			"title":"0",
			"deadline":"1",
			"stocks":"2"
		}]
		return book
		let sql = `SELECT s.title,r.deadline FROM brrow_records r, book_stocks s \
							where r.borrower = "${user}" \
							and   r.book_uuid = s.uuid;`
		console.log(sql)

		const data = await this.db.all(sql)
		console.log(data)
		return data
	}
	
	/*
	 * Create book stocks by submited information
	 * this will generate mutiple records according to parameter:Quantity
	 * 
	 * @param {Book} basic information of book
	 * @returns {Boolean} returns true if the new bookstocks has been added
	 * 
	 */ 
	async createbookstock(title,author,isbn_num,classification_num,quantity,create_user){
// 		Array.from(arguments).forEach(val =>{
// 			if(val.length === 0) throw new Error('missing field')
// 		})
		let sql = 'INSERT INTO book_stocks (title,author,uuid,isbn_num,classification_num,create_user,create_time) VALUES '
		for(let i = 0; i < quantity; i++){
			sql += `("${title}","${author}","select uuid()","${isbn_num}","${classification_num}","${create_user}","utc_time"),`
		}
		sql = sql.substr(0,sql.length-1) + ';'
		console.log(sql)
		await this.db.run(sql)
		return true
	}
	
		async close() {
		await this.db.close()
	}
	
}

export { BorrowRecords }