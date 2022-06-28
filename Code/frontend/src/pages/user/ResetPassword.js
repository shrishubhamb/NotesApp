import { useState } from 'react'
import axios from 'axios'
import { useLocation, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import serverConfig from '../../ServerConfig'

const ResetPassword = () => {
  const [newPassword, SetNewPassword] = useState('')
  const [otp, setOtp] = useState('')
  const navigate = useNavigate()
  const location = useLocation()
  const { email } = location.state

  const resetPassword = () => {
    if (otp.length === 0) {
      toast.error('Please enter OTP')
    } else if (newPassword.length === 0) {
      toast.error('Please enter new password')
    } else {
      var data = JSON.stringify({
        email: email,
        otp: otp,
        password: newPassword,
      })

      var config = {
        method: 'put',
        url: serverConfig.serverURL + '/user/reset',
        headers: {
          'Content-Type': 'application/json',
        },
        data: data,
      }

      axios(config).then(function (response) {
        if (response.data.status === 'InvalidToken') {
          toast.error('Invalid Token')
        } else {
          navigate('/signin')
          toast.success('Password Changed Successfully')
        }
      })
    }
  }

  return (
    <div className='container my-5'>
      <div className='row justify-content-center'>
        <div className='mt-3 text-center col-10 col-sm-10 col-md-5 col-lg-4'>
          <h3>Reset Password</h3>
        </div>
      </div>

      <form>
        <div className='row justify-content-center'>
          <div className='col-10 col-sm-10 col-md-5 col-lg-4 my-2'>
            <label className='form-label'>OTP</label>
            <input
              onChange={(event) => {
                setOtp(event.target.value)
              }}
              type='text'
              className='form-control'
            />
          </div>
        </div>
        <div className='row justify-content-center'>
          <div className='col-10 col-sm-10 col-md-5 col-lg-4 mb-2'>
            <label className='form-label'>New Password</label>
            <input
              onChange={(event) => {
                SetNewPassword(event.target.value)
              }}
              type='password'
              className='form-control'
            />
          </div>
        </div>
        <div className='row justify-content-center'>
          <div className='col-10 col-sm-10 col-md-5 col-lg-4 mt-3'>
            <div className='text-center'>
              <button
                style={{ width: 200 }}
                onClick={resetPassword}
                type='button'
                className='btn btn-primary'>
                Change Password
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  )
}

export default ResetPassword
