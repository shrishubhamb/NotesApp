const express = require('express')
const db = require('../db')
const utils = require('../utils')
const cryptoJs = require('crypto-js')
const jwt = require('jsonwebtoken')
const jwtConfig = require('../jwtConfig')
const nodemailer = require('nodemailer')

const router = express.Router()

//user signup
router.post('/signup', (request, response) => {
  const { firstName, lastName, email, password } = request.body

  const encryptedPassword = String(cryptoJs.MD5(password))
  const statement = `
    INSERT INTO user
        (firstName, lastName, email, password)
    VALUES (?, ?, ?, ?)
  `
  db.pool.query(
    statement,
    [firstName, lastName, email, encryptedPassword],
    (error, result) => {
      const res = {}
      if (result === undefined) {
        res.status = 'EmailAlreadyExists'
      } else {
        res.status = 'success'
      }
      response.send(res)
    }
  )
})

//user signin
router.post('/signin', (request, response) => {
  const { email, password } = request.body

  const encryptedPassword = String(cryptoJs.MD5(password))
  const statement = `
      SELECT id, firstName, lastName, email 
      FROM user
      WHERE email = ? and password = ?
    `
  db.pool.query(statement, [email, encryptedPassword], (error, users) => {
    const result = {}
    if (error) {
      result['status'] = 'error'
      result['error'] = error
    } else if (users.length === 0) {
      result['status'] = 'PasswordError'
      result['error'] = error
    } else {
      // get the first user from the array
      const user = users[0]
      const payload = { id: user['id'] }
      const token = jwt.sign(payload, jwtConfig.secret)

      result['status'] = 'success'
      result['data'] = {
        name: `${user['firstName']} ${user['lastName']}`,
        email: user['email'],
        token,
      }
    }

    response.send(result)
  })
})

//get user profile
router.get('/profile', (request, response) => {
  const statement = `SELECT firstName,lastName,email FROM user WHERE id=?`
  db.pool.query(statement, [request.userId], (error, result) => {
    response.send(utils.createResult(error, result))
  })
})

//update user profile
router.put('/profile/update', (request, response) => {
  const { firstName, lastName, email } = request.body
  const statement = `UPDATE user SET firstName=?, lastName=?, email=? WHERE id=?`
  db.pool.query(
    statement,
    [firstName, lastName, email, request.userId],
    (error, result) => {
      response.send(utils.createResult(error, result))
    }
  )
})

//update user password
router.put('/profile/update/password', (request, response) => {
  const { oldPassword, newPassword } = request.body
  const encryptedOldPassword = String(cryptoJs.MD5(oldPassword))
  const encryptedNewPassword = String(cryptoJs.MD5(newPassword))
  const statement = `UPDATE user SET password=? WHERE (password=? AND id=?)`
  db.pool.query(
    statement,
    [encryptedNewPassword, encryptedOldPassword, request.userId],
    (error, result) => {
      response.send(utils.createResult(error, result))
    }
  )
})

//check if email exists
router.post('/check_email', (request, response) => {
  const { email } = request.body
  const statement = 'SELECT COUNT(*) FROM user WHERE email=?'
  db.pool.query(statement, [email], (error, data) => {
    const result = {}
    if (error) {
      result['status'] = 'error'
      result['data'] = error
    } else if (data[0]['COUNT(*)'] === 0) {
      result['status'] = 'emailNotFound'
    } else {
      result['status'] = 'success'
      result['data'] = data
    }
    response.send(result)
  })
})

//send email
router.post('/send_email', (request, response) => {
  const { email } = request.body
  const otp = Math.floor(Math.random() * 10000)
  const statement = `UPDATE user SET otp=?, otpTime=? WHERE email=?`
  db.pool.query(statement, [otp, Date.now(), email], (error, data) => {
    const result = {}
    if (error) {
      result['status'] = 'error'
      result['data'] = error
    } else {
      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          // email account details of admin(hidden)
          user: '*** email_address ***',
          pass: '*** password ***',
        },
      })
      const mailOptions = {
        from: 'note.app.reset@gmail.com',
        to: email,
        subject: 'OTP To Reset Password',
        text:
          'You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n' +
          `OTP to reset your password is: ${otp} \n\n` +
          `This OTP is valid for only 10 minuts \n\n` +
          'If you did not request this, please ignore this email and your password will remain unchanged.\n',
      }

      transporter.sendMail(mailOptions, (err, response) => {
        if (err) {
          result['status'] = 'error'
        } else {
          result['status'] = 'success'
          result['data'] = data
        }
      })
      response.send(result)
    }
  })
})

//reset password
router.put('/reset', (request, response) => {
  // const { email } = request.params
  const { email, otp, password } = request.body
  const encryptedPassword = String(cryptoJs.MD5(password))
  const statement = `UPDATE user SET password=? WHERE (email=? AND otp=? AND (? - otpTime) < 600000)`
  db.pool.query(
    statement,
    [encryptedPassword, email, otp, Date.now()],
    (error, data) => {
      const result = {}
      if (error) {
        result.status = 'error'
      } else if (data.changedRows === 0) {
        result.status = 'InvalidToken'
      } else {
        result.status = 'sucess'
      }
      response.send(result)
    }
  )
})

//delete user profile
router.delete('/profile/delete', (request, response) => {
  const statement = `DELETE FROM user WHERE id=?`
  db.pool.query(statement, [request.userId], (error, result) => {
    response.send(utils.createResult(error, result))
  })
})

module.exports = router
