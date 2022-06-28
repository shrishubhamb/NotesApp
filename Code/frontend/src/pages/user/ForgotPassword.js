import { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import serverConfig from '../../ServerConfig'

const ForgotPassword = () => {
  const [email, setEmail] = useState('')
  const navigate = useNavigate()

  function validateEmail(email) {
    const regexp =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    return regexp.test(email)
  }

  const isEmailExist = () => {
    if (email.length === 0) {
      toast.error('Please enter email')
    } else if (!validateEmail(email)) {
      toast.error('Invalid Email Address')
    } else {
      var data = JSON.stringify({
        email: email,
      })

      var config = {
        method: 'post',
        url: serverConfig.serverURL + '/user/check_email',
        headers: {
          'Content-Type': 'application/json',
        },
        data: data,
      }

      axios(config).then(function (response) {
        if (response.data.status === 'emailNotFound') {
          toast.error('Email Not Registered')
        } else {
          sendEmail()
        }
      })
    }
  }

  const sendEmail = () => {
    var data = JSON.stringify({
      email: email,
    })

    var config = {
      method: 'post',
      url: serverConfig.serverURL + '/user/send_email',
      headers: {
        'Content-Type': 'application/json',
      },
      data: data,
    }

    axios(config).then(function (response) {
      navigate('/reset', { state: { email } })
      toast.success('OTP Sent')
    })
  }

  return (
    <div className='container my-5'>
      <div className='row justify-content-center'>
        <div className='mt-3 text-center col-10 col-sm-10 col-md-5 col-lg-4'>
          <h3>Forgot Password?</h3>
          <br />
          <p className='text-secondary'>
            Please enter your registered email address. You will receive an OTP
            to reset the password.
          </p>
        </div>
      </div>

      <form>
        <div className='row justify-content-center'>
          <div className='col-10 col-sm-10 col-md-5 col-lg-4 mb-2'>
            <label className='form-label'>Email</label>
            <input
              onChange={(event) => {
                setEmail(event.target.value)
              }}
              type='email'
              className='form-control'
            />
          </div>
        </div>
        <div className='row justify-content-center'>
          <div className='col-10 col-sm-10 col-md-5 col-lg-4 mt-3'>
            <div className='text-center'>
              <button
                style={{ width: 150 }}
                onClick={isEmailExist}
                type='button'
                className='btn btn-primary'>
                Send OTP
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  )
}

export default ForgotPassword
