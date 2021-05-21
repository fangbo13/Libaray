import sqlite from 'sqlite-async'

class Books{
	constructor(dbName = ':memory:'){
		return (async() => {
			this.db = await sqlite.open(dbName)
			const sql = 'CREATE TABLE IF NOT EXISTS book_stocks\
						(`id` Integer Primary KEY AUTOINCREMENT,\
						 `title` VARCHAR(256) NOT NULL,\
							`author` VARCHAR(128) NOT NULL,\
							`uuid` VARCHAR(128) NOT NULL,\
							`isbn_num` VARCHAR(128) NOT NULL,\
							`classification_num` VARCHAR(128) NOT NULL,\
							`create_user` VARCHAR(128) NULL,\
							`create_time` DATE NULL);'
			const dbbuild = await this.db.run(sql)
			console.log(dbbuild)
			
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
		//test
// 		let book = [{
// 			"title":"0",
// 			"author":"1",
// 			"stocks":"2"
// 		}]
// 		return book;
		
		let sql = `SELECT * FROM book_stocks GROUP BY isbn_num`;
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
		Array.fromCharCode(args).forEach(val =>{
			if(val.length === 0) throw new Error('missing field')
		})
		let sql = ``
		for( i = 0; i < quantity; i++){
			sql += `INSERT INTO book_stocks (title,author,uuid,isbn_num,classification_num,create_user,create_time) VALUES \
							("${title}","${author}",select uuid(),"${isbn_num}","${classification_num}","${create_user}",utc_time);`
		}
		console.log(sql)
		await this.db.prepare(sql)
		return true
	}
	
		async close() {
		await this.db.close()
	}
	
}



export {Books}