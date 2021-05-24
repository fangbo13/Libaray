import sqlite from 'sqlite-async'

class Books{
	constructor(dbName = ':memory:'){
		return (async() => {
			this.db = await sqlite.open(dbName)
			let sql = 'CREATE TABLE IF NOT EXISTS book_stocks\
						(`id` Integer Primary KEY AUTOINCREMENT,\
						 `title` VARCHAR(256) NOT NULL,\
							`author` VARCHAR(128) NOT NULL,\
							`uuid` VARCHAR(128) NOT NULL,\
							`isbn_num` VARCHAR(128) NOT NULL,\
							`classification_num` VARCHAR(128) NOT NULL,\
							`create_user` VARCHAR(128) NULL,\
							`create_time` DATE NULL);'
			const dbbuild = await this.db.run(sql)
// 			console.log(dbbuild)
						
			return this
		})()
	}

	
	/**
	 * query the book stock list
	 * group by ISBN-13 number
	 * 
	 * @returns {JsonObject}
	 * {
	 *	  "title":"title0",
	 *		"author":"author1",
	 *		"stocks":"2"
	 *	}
	 */
	async bookstockslist(){
		let sql = `SELECT id,title,author,count(1) as stocks FROM book_stocks Group by isbn_num`;
		let data = await this.db.all(sql)
// 		console.log(data)
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
		let datetime = new Date().toUTCString()
		let sql = 'INSERT INTO book_stocks (title,author,isbn_num,uuid,classification_num,create_user,create_time) VALUES '
		console.log(quantity)
		for(let i = 0; i < quantity; i++){
			sql += `("${title}","${author}","${isbn_num}",hex(randomblob(16)),"${classification_num}","${create_user}","${datetime}"),`
		}
		sql = sql.substr(0,sql.length-1) + ';'
		console.log(sql)
		await this.db.run(sql)
		return true
	}
	
		
	async searchbookstocks(searchitem){
		let sql = `SELECT s.title,s.author,s.isbn_num,count(1) as available,(SELECT count(1) FROM book_stocks where isbn_num = s.isbn_num) as stocks FROM book_stocks s where (s.title like '%${searchitem}%' OR s.author like '%${searchitem}%') AND s.uuid not in (SELECT book_uuid as uuid FROM borrow_records) GROUP BY s.isbn_num`
		console.log(sql)
		let result = await this.db.all(sql)
		console.log(result)
		return result
	}

	async close() {
		await this.db.close()
	}

	
}



export {Books}