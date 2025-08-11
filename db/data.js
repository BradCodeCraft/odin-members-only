import { Client } from "pg";
import bcrypt from "bcryptjs";

const testUser = {
  name: "Test User",
  username: "testuser",
  password: await bcrypt.hash(
    process.env.TESTUSERPASSWORD,
    parseInt(process.env.SALT),
  ),
  membershipStatus: "user",
};
const SQL = `
DELETE FROM users;

INSERT INTO users (name, username, password, membership_status) 
VALUES 
('Test User', 'testuser', '${await bcrypt.hash(process.env.TESTUSERPASSWORD, parseInt(process.env.SALT))}', 'user'),
('Test Member', 'testmember', '${await bcrypt.hash(process.env.TESTMEMBERPASSWORD, parseInt(process.env.SALT))}', 'member'),
('Test Admin', 'testadmin', '${await bcrypt.hash(process.env.TESTADMINPASSWORD, parseInt(process.env.SALT))}', 'admin');
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
