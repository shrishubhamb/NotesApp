const express = require('express')
const jwt = require('jsonwebtoken')
const cors = require('cors')
const utils = require('./utils')
const jwtConfig = require('./jwtConfig')

const app = express()

app.use(express.json())
app.use(cors())

//middleware to extract token
app.use((request, response, next) => {
  if (
    request.url === '/user/signup' ||
    request.url === '/user/signin' ||
    request.url === '/user/forgot_password' ||
    request.url === '/user/send_email' ||
    request.url === '/user/reset' ||
    request.url === '/user/check_email'
  ) {
    next()
  } else {
    const token = request.headers['token']

    if (!token || token.length === 0) {
      response.send(utils.createResult('token is missing'))
    } else {
      try {
        const payload = jwt.verify(token, jwtConfig.secret)
        request.userId = payload.id
        next()
      } catch (ex) {
        response.send(utils.createResult('invalid token'))
      }
    }
  }
})

const userRouter = require('./routes/user')
const noteRouter = require('./routes/note')
app.use('/user', userRouter)
app.use('/note', noteRouter)

app.listen(4000, () => {
  console.log('server started on port 4000')
})
