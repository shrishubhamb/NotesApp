import { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import serverConfig from '../../ServerConfig'

const SignUp = () => {
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const navigate = useNavigate()

  function validateEmail(email) {
    const regexp =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    return regexp.test(email)
  }

  const signUp = () => {
    if (firstName.length === 0) {
      toast.error('Please Enter First Name')
    } else if (lastName.length === 0) {
      toast.error('Please Enter Last Name')
    } else if (email.length === 0) {
      toast.error('Please Enter Email')
    } else if (!validateEmail(email)) {
      toast.error('Invalid Email Address')
    } else if (password.length === 0) {
      toast.error('Please Enter Password')
    } else {
      var data = JSON.stringify({
        firstName: firstName,
        lastName: lastName,
        email: email,
        password: password,
      })

      var config = {
        method: 'post',
        url: serverConfig.serverURL + '/user/signup',
        headers: {
          'Content-Type': 'application/json',
        },
        data: data,
      }

      axios(config)
        .then((response) => {
          if (response.data.status === 'EmailAlreadyExists') {
            toast.error('Email Already Exists')
          } else {
            toast.success('Successfully Registered')
            navigate('/signin')
          }
        })
        .catch((error) => {
          console.log('error')
          console.log(error)
        })
    }
  }

  return (
    <div className='container my-5'>
      <div className='row justify-content-center'>
        <div className='text-center col-10 col-sm-10 col-md-5 col-lg-4'>
          <div className='mt-3 text-center'>
            <h3>SignUp</h3>
          </div>{' '}
        </div>
      </div>

      <form>
        <div className='row justify-content-center'>
          <div className='col-10 col-sm-10 col-md-5 col-lg-4 my-2'>
            <label className='form-label'>First Name</label>
            <input
              onChange={(event) => {
                setFirstName(event.target.value)
              }}
              type='text'
              className='form-control'
            />{' '}
          </div>
        </div>

        <div className='row justify-content-center'>
          <div className='col-10 col-sm-10 col-md-5 col-lg-4 mb-2'>
            <label className='form-label'>Last Name</label>
            <input
              onChange={(event) => {
                setLastName(event.target.value)
              }}
              type='text'
              className='form-control'
            />{' '}
          </div>
        </div>

        <div className='row justify-content-center'>
          <div className='col-10 col-sm-10 col-md-5 col-lg-4 mb-2'>
            <label className='form-label'>Email</label>
            <input
              onChange={(event) => {
                setEmail(event.target.value)
              }}
              type='email'
              className='form-control'
            />{' '}
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
            />{' '}
          </div>
        </div>

        <div className='row justify-content-center'>
          <div className='mt-4 col-10 col-sm-10 col-md-5 col-lg-4'>
            <div className='text-center'>
              <button
                style={{ width: 125 }}
                onClick={signUp}
                type='button'
                className='btn btn-primary'>
                SignUp
              </button>
            </div>{' '}
          </div>
        </div>
      </form>
    </div>
  )
}

export default SignUp
