import { useEffect, useState } from 'react'
import axios from 'axios'
import serverConfig from '../../ServerConfig'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

const Profile = () => {
  const [profile, setProfile] = useState([])
  const navigate = useNavigate()

  useEffect(() => {
    getProfile()
  }, [])

  const getProfile = () => {
    var config = {
      method: 'get',
      url: serverConfig.serverURL + '/user/profile',
      headers: {
        token: localStorage.getItem('token'),
      },
    }

    axios(config).then((response) => {
      const result = response.data
      if (result['status'] === 'success') {
        setProfile(result['data'])
      } else {
        toast.error(result['error'])
      }
    })
  }

  const updateProfile = () => {
    navigate('/profile/update')
  }

  const updatePassword = () => {
    navigate('/update_password')
  }

  const deleteUser = () => {
    navigate('/profile/delete')
  }

  return (
    <div className='container my-5 text-center'>
      {profile.map((M) => {
        return (
          <div key={M.email}>
            <div className='row justify-content-center '>
              <div className='col-10 col-sm-10 col-md-5 col-lg-4 mb-2'>
                <div className='card shadow-lg text-light rounded bg-primary'>
                  <div className='card-header'>
                    <h3>Profile</h3>
                  </div>
                  <ul className='list-group list-group-flush'>
                    <li className='list-group-item'>
                      <b>First Name:</b> {M.firstName}
                    </li>
                    <li className='list-group-item'>
                      <b>Last Name:</b> {M.lastName}
                    </li>
                    <li className='list-group-item'>
                      <b>Email:</b> {M.email}
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <div className='row justify-content-center text-center mt-3'>
              <div className='col-10 mb-2'>
                <button
                  style={{ width: 200 }}
                  onClick={updateProfile}
                  type='button'
                  className='btn btn-primary'>
                  Update Profile
                </button>
              </div>

              <div className='col-10 mb-2'>
                <button
                  style={{ width: 200 }}
                  onClick={updatePassword}
                  type='button'
                  className='btn btn-primary'>
                  Change Password
                </button>
              </div>

              <div className='col-10'>
                <button
                  style={{ width: 200 }}
                  onClick={deleteUser}
                  type='button'
                  className='btn btn-danger'>
                  Delete User
                </button>
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default Profile
