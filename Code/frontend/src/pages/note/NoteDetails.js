import { useEffect, useState } from 'react'
import axios from 'axios'
import serverConfig from '../../ServerConfig'
import { useLocation, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

const NoteDetails = () => {
  const [note, setNote] = useState([])
  const navigate = useNavigate()
  const location = useLocation()

  useEffect(() => {
    if (!localStorage.getItem('token')) {
      navigate('/signin')
    } else {
      const { id } = location.state
      getMyNote(id)
    }
  })

  const getMyNote = (id) => {
    var config = {
      method: 'get',
      url: serverConfig.serverURL + '/note/my/' + id,
      headers: {
        token: localStorage.getItem('token'),
      },
    }

    axios(config).then((response) => {
      const result = response.data

      if (result['status'] === 'success') {
        // set the homes to the state member
        setNote(result['data'])
      } else {
        toast.error(result['error'])
      }
    })
  }

  const edit = (id) => {
    navigate('/note/edit', { state: { id } })
  }

  const deleteNote = (id) => {
    var config = {
      method: 'delete',
      url: serverConfig.serverURL + '/note/delete/' + id,
      headers: {
        token: localStorage.getItem('token'),
      },
    }

    axios(config).then((response) => {
      const result = response.data
      if (result['status'] === 'success') {
        toast.success('Note Deleted Successfully')
        navigate('/my_notes')
      } else {
        toast.error(result['error'])
      }
    })
  }

  return (
    <div className='container my-5 text-center'>
      {note.map((N) => {
        return (
          <div key={N.id}>
            <div className='row justify-content-center '>
              <div className='mt-2 col-11 col-sm-11 col-md-8 col-lg-7'>
                <div className='shadow-lg bg-body rounded'>
                  <div className='card'>
                    <div className='card-body'>
                      <h5 className='card-title text-primary'>{N.title}</h5>
                      <hr />
                      <p
                        className='card-text'
                        style={{ textAlign: 'justify', textJustify: 'auto' }}>
                        {N.content}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className='text-center mt-4'>
              <button
                onClick={() => edit(N.id)}
                style={{ marginRight: 10, width: 145 }}
                type='button'
                className='btn btn-primary'>
                Edit
              </button>
              <button
                onClick={() => deleteNote(N.id)}
                style={{ marginLeft: 10, width: 145 }}
                type='button'
                className='btn btn-danger'>
                Delete
              </button>
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default NoteDetails
