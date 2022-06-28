import { useState } from 'react'
import axios from 'axios'
import { useNavigate, Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import { useDispatch } from 'react-redux'
import { signin } from '../../slices/authSlice'
import serverConfig from '../../ServerConfig'

const SignIn = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()
  const dispatch = useDispatch()

  function validateEmail(email) {
    const regexp =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    return regexp.test(email)
  }

  const isEmailExist = () => {
    if (email.length === 0) {
      toast.error('Please Enter Email')
    } else if (!validateEmail(email)) {
      toast.error('Invalid Email Address')
    } else if (password.length === 0) {
      toast.error('Please Enter Password')
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

      axios(config)
        .then(function (response) {
          if (response.data.status === 'emailNotFound') {
            toast.error('Email Not Registered')
          } else {
            signIn()
          }
        })
        .catch((error) => {
          console.log('error')
          console.log(error)
        })
    }
  }

  const signIn = () => {
    var data = JSON.stringify({
      email: email,
      password: password,
    })

    var config = {
      method: 'post',
      url: serverConfig.serverURL + '/user/signin',
      headers: {
        'Content-Type': 'application/json',
      },
      data: data,
    }

    axios(config)
      .then((response) => {
        const result = response.data
        if (result['status'] === 'PasswordError') {
          toast.error('Invalid Credentials')
        } else {
          const user = result['data']
          dispatch(signin(user))
          toast.success('Welcome to NotesApp')
          navigate('/')
        }
      })
      .catch((error) => {
        console.log('error')
        console.log(error)
      })
  }

  return (
    <div className='container my-5'>
      <div className='row justify-content-center'>
        <div className='mt-3 text-center col-10 col-sm-10 col-md-5 col-lg-4'>
          <h3>SignIn</h3>
        </div>
      </div>

      <form>
        <div className='row justify-content-center'>
          <div className='col-10 col-sm-10 col-md-5 col-lg-4 my-2'>
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
          <div className='col-10 col-sm-10 col-md-5 col-lg-4 mb-2'>
            <label className='form-label'>Password</label>
            <input
              onChange={(event) => {
                setPassword(event.target.value)
              }}
              type='password'
              className='form-control'
            />
          </div>
        </div>

        <div className='row justify-content-center'>
          <div className='col-10 col-sm-10 col-md-5 col-lg-4 m-2'>
            <div className='text-center'>
              <Link style={{ textDecoration: 'none' }} to='/forgot_password'>
                Forgot your password?
              </Link>
            </div>
          </div>
        </div>

        <div className='row justify-content-center'>
          <div className='col-10 col-sm-10 col-md-5 col-lg-4 mt-3'>
            <div className='text-center'>
              <button
                style={{ width: 125 }}
                onClick={isEmailExist}
                type='button'
                className='btn btn-primary'>
                SignIn
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  )
}

export default SignIn
