import { useEffect, useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import serverConfig from '../../ServerConfig'
import { toast } from 'react-toastify'

const UpdateProfile = () => {
  const [oldProfile, setOldProfile] = useState([])
  let [newFirstName, setNewFirstName] = useState('')
  let [newLastName, setNewLastName] = useState('')
  let [newEmail, setNewEmail] = useState('')

  const navigate = useNavigate()

  useEffect(() => {
    getOldProfile()
  }, [])

  const getOldProfile = () => {
    var config = {
      method: 'get',
      url: serverConfig.serverURL + '/user/profile',
      headers: {
        token: localStorage.getItem('token'),
      },
    }
    axios(config).then(function (response) {
      const result = response.data
      setOldProfile(result['data'][0])
    })
  }

  function validateEmail(email) {
    const regexp =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    return regexp.test(email)
  }

  const updateProfile = () => {
    if (newFirstName.length === 0) {
      newFirstName = oldProfile.firstName
    }
    if (newLastName.length === 0) {
      newLastName = oldProfile.lastName
    }
    if (newEmail.length === 0) {
      newEmail = oldProfile.email
    } else if (!validateEmail(newEmail)) {
      toast.error('Invalid Email Address')
    }
    var data = JSON.stringify({
      firstName: newFirstName,
      lastName: newLastName,
      email: newEmail,
    })
    var config = {
      method: 'put',
      url: serverConfig.serverURL + '/user/profile/update',
      headers: {
        token: localStorage.getItem('token'),
        'Content-Type': 'application/json',
      },
      data: data,
    }
    axios(config).then(function (response) {
      toast.success('Profile Updated Successfully')
      localStorage.setItem('username', newFirstName + ' ' + newLastName)
      navigate('/profile')
    })
  }

  return (
    <div className='container my-5'>
      <div className='row justify-content-center'>
        <div className='mt-3 text-center col-10 col-sm-10 col-md-5 col-lg-4'>
          <div className='text-center text-primary'>
            <h3>Update Profile</h3>
          </div>
        </div>
      </div>

      <form>
        <div className='row justify-content-center'>
          <div className='mt-3 col-10 col-sm-10 col-md-5 col-lg-4'>
            <label className='form-label'>First Name</label>
            <input
              onChange={(event) => {
                setNewFirstName(event.target.value)
              }}
              type='text'
              defaultValue={oldProfile.firstName}
              className='form-control'
            />
          </div>
        </div>

        <div className='row justify-content-center'>
          <div className='mt-3 col-10 col-sm-10 col-md-5 col-lg-4'>
            <label className='form-label'>Last Name</label>
            <input
              onChange={(event) => {
                setNewLastName(event.target.value)
              }}
              type='text'
              defaultValue={oldProfile.lastName}
              className='form-control'
            />
          </div>
        </div>

        <div className='row justify-content-center'>
          <div className='mt-3 col-10 col-sm-10 col-md-5 col-lg-4'>
            <label className='form-label'>Email</label>
            <input
              onChange={(event) => {
                setNewEmail(event.target.value)
              }}
              type='text'
              defaultValue={oldProfile.email}
              className='form-control'
            />
          </div>
        </div>

        <div className='row justify-content-center'>
          <div className='mt-4 text-center col-10 col-sm-10 col-md-5 col-lg-4'>
            <button
              style={{ width: 125 }}
              onClick={updateProfile}
              type='button'
              className='btn btn-primary'>
              Update
            </button>
          </div>
        </div>
      </form>
    </div>
  )
}

export default UpdateProfile
