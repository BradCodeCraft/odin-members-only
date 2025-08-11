import { Client } from "pg";

const SQL = `
DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS message;

CREATE TABLE IF NOT EXISTS users ( 
  id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  name VARCHAR(255),
  username VARCHAR(255),
  password VARCHAR(255),
  membership_status VARCHAR(8)
);

CREATE TABLE IF NOT EXISTS message (
  id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  title VARCHAR(255),
  timestamp TIMESTAMP,
  content TEXT,
  author INTEGER REFERENCES users(id) ON DELETE CASCADE
);
`;

async function main() {
  const client = new Client({
    connectionString: process.env.CONNECTIONSTRING,
  });
  console.log("Connecting to database...");
  await client.connect();
  console.log("Connected to database");
  console.log("Executing SQL...");
  await client.query(SQL);
  console.log("SQL executed");
  console.log("Disconnecting from database...");
  await client.end();
  console.log("Disconnected from database");
}

main();
