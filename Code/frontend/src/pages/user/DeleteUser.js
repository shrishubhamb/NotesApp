import axios from 'axios'
import serverConfig from '../../ServerConfig'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { useDispatch } from 'react-redux'
import { signout } from '../../slices/authSlice'

const DeleteUser = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const deleteProfile = () => {
    var config = {
      method: 'delete',
      url: serverConfig.serverURL + '/user/profile/delete',
      headers: {
        token: localStorage.getItem('token'),
      },
    }
    axios(config).then(function (response) {
      dispatch(signout())
      toast.success('Account Deleted Successfully')
      navigate('/signin')
    })
  }

  const deleteUser = () => {
    var config = {
      method: 'delete',
      url: serverConfig.serverURL + '/note/delete_all',
      headers: {
        token: localStorage.getItem('token'),
      },
    }

    axios(config).then(function (response) {
      deleteProfile()
    })
  }

  return (
    <div className='container my-5 text-center'>
      <div className='row justify-content-center'>
        <div className='col-10 col-sm-10 col-md-8'>
          <h3>Do you want to delete your account?</h3>
        </div>
      </div>

      <div className='row justify-content-center'>
        <div className='col-10 col-sm-10 col-md-8 mt-1'>
          <button
            onClick={deleteUser}
            style={{ marginTop: 20 }}
            className='btn btn-danger btn-lg'
            type='button'>
            Delete Account
          </button>
        </div>
      </div>
    </div>
  )
}

export default DeleteUser
