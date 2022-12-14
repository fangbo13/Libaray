import sqlite from 'sqlite-async'
import dayjs from 'dayjs'

class BorrowRecords {
	constructor(dbName = ':memory:') {
		return (async() => {
			this.db = await sqlite.open(dbName)
			const sql = 'CREATE TABLE IF NOT EXISTS borrow_records\
						(`id` Integer Primary KEY AUTOINCREMENT,`book_uuid` VARCHAR(256) NOT NULL,\
							`borrower` VARCHAR(128) NOT NULL,`start_time` DATE NOT NULL,\
							`deadline` DATE NOT NULL);'
			await this.db.run(sql)
			const sql1 = 'CREATE TABLE IF NOT EXISTS book_stocks\
						(`id` Integer Primary KEY AUTOINCREMENT,`title` VARCHAR(256) NOT NULL,\
							`author` VARCHAR(128) NOT NULL,`uuid` VARCHAR(128) NOT NULL,\
							`isbn_num` VARCHAR(128) NOT NULL,`classification_num` VARCHAR(128) NOT NULL,\
							`create_user` VARCHAR(128) NULL,`create_time` DATE NULL);'
			await this.db.run(sql1)
			return this
		})()
	}

	async recordlist(user) {
		const sql = `SELECT s.title,s.author,s.isbn_num,r.book_uuid,\
								 r.borrower,r.deadline \
								 FROM borrow_records r, book_stocks s \
							   where r.borrower = '${user}' \
							   and   r.book_uuid = s.uuid;`
		// 		console.log(sql)

		const data = await this.db.all(sql)
		// 		console.log(data)
		return data
	}

	/*
	 * Create book borrow record by submited information
	 *
	 * @param {uuid} uuid of book
	 * @returns {Boolean} returns true if the new bookstocks has been added
	 *
	 */
	async createborrowrecord(uuid,borrower) {
		const sqlitem = `SELECT count(uuid) as records FROM book_stocks WHERE uuid='${uuid}';`
		const item = await this.db.get(sqlitem)
		if(item.records === 0) throw new Error('book is not exist')
		const sqluser = `SELECT count(user) as records FROM users WHERE user='${borrower}';`
		const user = await this.db.get(sqluser)
		if(user.records === 0) throw new Error('user is not exist')
		const sqlavailabe = `SELECT count(book_uuid) as records \
												 FROM borrow_records WHERE book_uuid='${uuid}';`
		const available = await this.db.get(sqlavailabe)
		if(available.records !== 0) throw new Error('book is already borrowed')
		const starttime = dayjs().format('DD/MM/YYYY')
		const onemonth = 30
		const deadline = dayjs().add(onemonth,'day').format('DD/MM/YYYY')
		//const deadline = dayjs().subtract(30,'day').format('DD/MM/YYYY')

		const sqlcreaterecord = `INSERT INTO borrow_records \
												  (book_uuid,borrower,start_time,deadline) VALUES\
												  ('${uuid}','${borrower}','${starttime}','${deadline}');`
		await this.db.run(sqlcreaterecord)
		return true
	}

	async close() {
		await this.db.close()
	}

	async deleteborrowrecord(uuid,borrower) {
		const sqldelete = `DELETE FROM borrow_records \
											 WHERE book_uuid = '${uuid}' \
											 AND borrower = '${borrower}';`
		await this.db.run(sqldelete)
		return true
	}

}

export { BorrowRecords }
