const { Pool } = require("pg") //mports the "Pool" functionality from the "pg" package. A pool is a collection of connection objects (10 is the default number) that allow multiple site visitors to be interacting with the database at any given time. This keeps you from having to create a separate connection for each interaction.
require("dotenv").config() // imports the "dotenv" package which allows the sensitive information about the database location and connection credentials to be stored in a separate location and still be accessed.
/* ***************
 * Connection Pool
 * SSL Object needed for local testing of app
 * But will cause problems in production environment
 * If - else will make determination which to use
 * *************** */
let pool //creates a local pool variable to hold the functionality of the "Pool" connection.
if (process.env.NODE_ENV == "development") { //an if test to see if the code exists in a developent environment, as declared in the .env file. In the production environment, no value will be found.
  pool = new Pool({ //creates a new pool instance from the imported Pool class.
    connectionString: process.env.DATABASE_URL, //indicates how the pool will connect to the database (use a connection string) and the value of the string is stored in a name - value pair, which is in the .env file locally, and in an "environment variable" on a remote server. These are equivelent concepts, but different implementations.
    ssl: {
      rejectUnauthorized: false,
    }, //describes how the Secure Socket Layer (ssl) is used in the connection to the database, but only in a remote connection, as exists in our development environment.
}) // ends the pool function started on line 11. SSL is a means of excrypting the flow of information from one network location to another. In this case, when we attempt to communicate with the remote database server from our own computer the code indicates that the server should not reject our connection. However, when we work in a remote production server, the ssl lines must not exist. This is because our application server and the database server will be in the same system and their communication will be secure, which is what we will require.

// Added for troubleshooting queries
// during development
module.exports = {
  async query(text, params) {
    try {
      const res = await pool.query(text, params)
      console.log("executed query", { text })
      return res
    } catch (error) {
      console.error("error in query", { text })
      throw error
    }
  },
} //exports an asynchronous query function that accepts the text of the query and any parameters. When the query is run it will add the SQL to the console.log. If the query fails, it will console log the SQL text to the console as an error. This code is primarily for troubleshooting as you develop. As you test the application in your development mode, have the terminal open, and you will see the queries logged into the terminal as each is executed.
} else {
  pool = new Pool({
    connectionString: process.env.DATABASE_URL,
  })
  module.exports = pool
}/*Line 32 - ends the if and opens the else structure. Line 33 - creates a new "pool" instance from the "Pool" class. Line 34 - indicates the value of the connection string will be found in an environment variable. In the production environment, such a variable will not be stored in our .env file, but in the server's settings. Line 35 - ends the Pool object and instance creation. Line 36 - exports the pool object to be used whenever a database connection is needed. This is for the production environment, which means the queries will not be entered into the console. Line 37 - ends the else structure.*/
