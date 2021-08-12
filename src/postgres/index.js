const { Client } = require('pg')
const client = new Client()

await client.connect()

await client.end()