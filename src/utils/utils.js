const bcrypt = require('bcrypt');

/**
 * @function hashPassword
 * @description
 * Securely hashes a plain text password using bcrypt with salt.
 *
 * - Generates a salt using 10 rounds (recommended default)
 * - Hashes the password
 * - Returns the hashed password as a string
 *
 * @async
 * @param {string} password - Plain text password to hash.
 *
 * @returns {Promise<string>} - A promise that resolves to the hashed password.
 *
 * @throws {Error} Throws if hashing fails or password is invalid.
 *
 * @example
 * const hashed = await hashPassword("mySecret123");
 * console.log(hashed); // $2b$10$...
 */
exports.hashPassword = async function(password) {
  try {
    const saltRounds = 10; // Recommended value
    const salt = await bcrypt.genSalt(saltRounds);
    const hashedPassword = await bcrypt.hash(password, salt);
    return hashedPassword;
  } catch (error) {
    console.error("Error hashing password:", error);
    throw error;
  }
}
