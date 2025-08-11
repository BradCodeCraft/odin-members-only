import pool from "./pool.js";

/**
 * @returns {Promise<{id: number, title: string, timestamp: Date, content: string, author: number}>}
 */
export async function getAllMessages() {
  try {
    const { rows } = await pool.query("SELECT * FROM message");

    return rows;
  } catch (err) {
    console.error(`Query failed! Error: ${err}.`);
  }
}

/**
 * @returns {Promise<{id: number, name: string, username: string, password: string, membershipStatus: string}>}
 */
export async function getAllUsers() {
  try {
    const { rows } = await pool.query("SELECT * FROM users");

    return rows;
  } catch (err) {
    console.error(`Query failed! Error: ${err}.`);
  }
}

/**
 * @param {string} name
 * @param {string} username
 * @param {string} hashedPassword
 */
export async function createUser(name, username, hashedPassword) {
  try {
    await pool.query(
      "INSERT INTO users (name, username, password, membership_status) VALUES ($1, $2, $3, $4)",
      [name, username.toLowerCase(), hashedPassword, "user"],
    );
  } catch (err) {
    console.error(`Query failed! Error: ${err}.`);
  }
}

/**
 * @param {string} title
 * @param {string} content
 * @param {number} author
 * @param {Date} timestamp
 */
export async function createMessage(title, content, author, timestamp) {
  try {
    await pool.query(
      "INSERT INTO message (title, timestamp, content, author) VALUES ($1, $2, $3, $4)",
      [title, timestamp, content, author],
    );
  } catch (err) {
    console.error(`Query failed! Error: ${err}.`);
  }
}

/**
 * @param {number} id
 */
export async function updateUserMembershipById(id) {
  try {
    await pool.query(
      "UPDATE users SET membership_status = 'member' WHERE id = $1",
      [id],
    );
  } catch (err) {
    console.error(`Query failed! Error: ${err}.`);
  }
}

export async function deleteMessageById(id) {
  try {
    await pool.query("DELETE FROM message where id = $1", [id]);
  } catch (err) {
    console.error(`Query failed! Error: ${err}.`);
  }
}
