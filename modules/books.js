import sqlite from 'sqlite-async'

class Books{
	constructor(dbName = ':memory:'){
		return (async() => {
			this.db = await sqlite.open(dbName)
			const sql = 'CREATE TABLE IF NOT EXISTS books
						()'
		})
	}
}