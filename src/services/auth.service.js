/**
 * @fileoverview Authentication Service
 * Provides core business logic for:
 * - Token decoding
 * - User registration
 * - User login
 * - Password change
 *
 * This layer contains NO Express code.
 * The controller should call these functions only.
 */

const jwt = require("jsonwebtoken");
const usersSchema = require("../models/usersSchema");
const userRolesSchema = require("../models/userRolesSchema");
const { hashPassword } = require("../utils/utils");
const nodemailer = require('nodemailer');

module.exports = {
  /**
   * @function decodeToken
   * @description Decodes and verifies a JWT token.
   *
   * @param {string} token - The JWT token from the client.
   * @param {string} secret - JWT secret key.
   * @returns {Object} Decoded token payload.
   * @throws {Error} If token is invalid or expired.
   */
  decodeToken(token, secret) {
    return jwt.verify(token, secret);
  },

  /**
   * @function registerUser
   * @description Creates a new user in the database.
   *
   * @param {Object} data - User registration data.
   * @param {string} ip - IP address of the requesting client.
   * @param {string|null} creatorId - User ID that created this account.
   * @returns {Promise<Object>} Newly created user object.
   */
  async registerUser(data, ip, creatorId) {
    const roleType = data.userRoleType || 2;
    const role = await userRolesSchema.findOne({ roleType });

    const newUser = new usersSchema(data);
    newUser.userrole = role;
    newUser.ipAddress = ip;
    newUser.createdBy = creatorId || null;

    if (data.noOfTables && data.userRoleType == 1) {
      newUser.noOfTables = data.noOfTables;
    }

    const hashedPassword = await hashPassword(data.password);
    newUser.passwordHash = hashedPassword;

    const user = await newUser.save();
    user.passwordHash = undefined;
    return user;
  },

  /**
   * @function login
   * @description Validates credentials and returns a signed JWT.
   *
   * @param {Object} param0 - Login data.
   * @param {string} param0.email - User email.
   * @param {string} param0.password - User password.
   * @param {number} param0.userRoleType - Role type to match.
   * @param {string} secret - JWT signing secret.
   * @param {string|number} expiry - JWT expiration config.
   *
   * @returns {Promise<string|null>} JWT token or null if invalid.
   */
  async login({ email, password, userRoleType }, secret, expiry) {
    const role = await userRolesSchema.findOne({ roleType: userRoleType });
    const user = await usersSchema.findOne({ email, userrole: role });

    if (!user || !user.comparePassword(password)) {
      return null;
    }

    const token = jwt.sign(
      { email: user.email, fullName: user.fullName, _id: user._id },
      secret,
      { expiresIn: expiry }
    );

    return {token: token, userdetails: user};
  },

  /**
   * @function changePassword
   * @description Updates password of an existing user.
   *
   * @param {string} userId - ID of user whose password will be changed.
   * @param {string} oldPass - Existing password.
   * @param {string} newPass - New password.
   * @returns {Promise<boolean>} true if success, false if authentication fails.
   */
  async changePassword(userId, oldPass, newPass) {
    const user = await usersSchema.findOne({ _id: userId });
    if (!user || !user.comparePassword(oldPass)) return null;

    const hashed = await hashPassword(newPass);
    await usersSchema.updateOne({ _id: userId }, { passwordHash: hashed });
    return true;
  },

  /**
   * @function forgotPasswordRequest
   * @description Generates token and sents an email for password reset link.
   *
   * @param {string} resetPasswordUrl - reset password frontend URL.
   * @param {string} userEmail - user Email.
   * @returns {Promise<boolean>} true if success, false if authentication fails.
   */
  async forgotPasswordRequest(resetPasswordUrl, userEmail){
      
      try {
        const user = await usersSchema.findOne({ email: userEmail });
        if (!user) return null;

        const secret = process.env.JWT_SECRET_ACCESS_TOKEN;
        const token = jwt.sign({ id: user._id, email: user.email }, secret, { expiresIn: '1h' });

        const resetURL = `${resetPasswordUrl}?token=${token}`;
        
        const transporter = nodemailer.createTransport({
          service: 'gmail',
          auth: {
            user: process.env.SENDER_EMAIL,
            pass: process.env.APP_PASSWORD,
           }
        });

        const mailOptions = {
          to: userEmail,
          from: process.env.EMAIL,
          subject: 'Reset Password for InfoAIOS',
          text: `Hi ${user.username},\n
           You have requested the reset of the password for your account.\n\n
          Please click on the following link, or paste this into your browser to complete the process: \n
          ${resetURL}\n\n
          If you did not request this, please ignore this email and your password will remain unchanged.\n`,
        };
        
        await transporter.sendMail(mailOptions);
        return true;
      } catch (error) {
        return error;
      }
  },

  /**
   * @function forgotPasswordReset
   * @description Resets Forgotten password by new password
   *
   * @param {string} token - reset password token.
   * @param {string} new_password - new password for reset.
   * @returns {Promise<boolean>} true if success, false if authentication fails.
   */
  async forgotPasswordReset(token, new_password){
    try{
      const decodedDetails = jwt.verify(token, process.env.JWT_SECRET_ACCESS_TOKEN);
      const user = await usersSchema.findById(decodedDetails.id);

      if(!user) return null;

      user.passwordHash = await hashPassword(new_password);

      await user.save();

      return true;

    }catch(error){
      return error;
    }
  }
};