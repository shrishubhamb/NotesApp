import { useEffect, useState } from 'react'
import axios from 'axios'
import serverConfig from '../../ServerConfig'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

const MyNotes = () => {
  const [notes, setNotes] = useState([])
  const navigate = useNavigate()

  useEffect(() => {
    if (!localStorage.getItem('token')) {
      navigate('/signin')
    } else {
      getMyNotes()
    }
  })

  const getMyNotes = () => {
    var config = {
      method: 'get',
      url: serverConfig.serverURL + '/note/my',
      headers: {
        token: localStorage.getItem('token'),
      },
    }

    axios(config).then((response) => {
      const result = response.data

      if (result['status'] === 'success') {
        // set the homes to the state member
        setNotes(result['data'])
      } else {
        toast.error(result['error'])
      }
    })
  }

  const details = (id) => {
    navigate('/note', { state: { id } })
  }

  return (
    <div className='container my-4 text-center'>
      <div className='mb-3 text-center text-primary'>
        <h3>My Notes</h3>
      </div>

      {notes.map((N) => {
        return (
          <div key={N.id}>
            <div className='row justify-content-center '>
              <div className='my-2 col-11 col-sm-11 col-md-8 col-lg-7'>
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
                      <button
                        onClick={() => details(N.id)}
                        className='btn btn-link stretched-link'></button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default MyNotes
