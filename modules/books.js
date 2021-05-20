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
							`quantity` INT NOT NULL,\
							`create_user` VARCHAR(128) NULL,\
							`create_time` DATE NULL);'
			await this.db.run(sql)
			
			return this
		})()
	}
	
	/**
	 * 
	 * 
	 * 
	 * 
	 */
	async bookstockslist(){
		//test
		let book = [{
			"title":"0",
			"author":"1",
			"stocks":"2"
		}]
		return book;
		
		let sql = `SELECT * FROM book_stocks GROUP BY isbn_num`;
		const data = await this.db.get(sql)
		if(data.records !== 0){
			throw new Error(`no books in stock`)
		}
	}
}

export {Books}