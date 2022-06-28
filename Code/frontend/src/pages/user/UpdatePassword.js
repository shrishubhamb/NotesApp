import { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import serverConfig from '../../ServerConfig'
import { toast } from 'react-toastify'

const UpdatePassword = () => {
  const [oldPassword, SetOldPassword] = useState('')
  const [newPassword, SetNewPassword] = useState('')
  const [newPasswordR, SetNewPasswordR] = useState('')
  const navigate = useNavigate()

  const updatePassword = () => {
    if (oldPassword.length === 0) {
      toast.warning('Please enter old password')
    } else if (newPassword.length === 0) {
      toast.warning('Please enter new password')
    } else if (newPasswordR.length === 0) {
      toast.warning('Please enter new password again')
    } else if (newPassword !== newPasswordR) {
      toast.warning('New password does not match')
    } else {
      var data = JSON.stringify({
        oldPassword: oldPassword,
        newPassword: newPassword,
      })

      var config = {
        method: 'put',
        url: serverConfig.serverURL + '/user/profile/update/password',
        headers: {
          token: localStorage.getItem('token'),
          'Content-Type': 'application/json',
        },
        data: data,
      }

      axios(config).then(function (response) {
        if (response.data.data.changedRows === 0) {
          toast.error('Incorrect old password')
        } else {
          toast.success('Password Changed Successfully')
          navigate('/profile')
        }
      })
    }
  }

  return (
    <div className='container my-5'>
      <div className='row justify-content-center'>
        <div className='mt-3 col-10 col-sm-10 col-md-5 col-lg-4 text-center'>
          <h3>Change Password</h3>
        </div>
      </div>

      <form>
        <div className='row justify-content-center'>
          <div className='mt-3 col-10 col-sm-10 col-md-5 col-lg-4'>
            <label className='form-label'>Old Password</label>
            <input
              onChange={(event) => {
                SetOldPassword(event.target.value)
              }}
              type='password'
              className='form-control'
            />
          </div>
        </div>

        <div className='row justify-content-center'>
          <div className='mt-3 col-10 col-sm-10 col-md-5 col-lg-4'>
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
          <div className='mt-3 col-10 col-sm-10 col-md-5 col-lg-4'>
            <label className='form-label'>Enter New Password Again</label>
            <input
              onChange={(event) => {
                SetNewPasswordR(event.target.value)
              }}
              type='password'
              className='form-control'
            />
          </div>
        </div>

        <div className='row justify-content-center'>
          <div className='mt-4 col-10 col-sm-10 col-md-5 col-lg-4 text-center'>
            <button
              style={{ width: 200 }}
              onClick={updatePassword}
              type='button'
              className='btn btn-primary'>
              Update Password
            </button>
          </div>
        </div>
      </form>
    </div>
  )
}

export default UpdatePassword
