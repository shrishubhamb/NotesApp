import { useEffect, useState } from 'react'
import axios from 'axios'
import { useLocation, useNavigate } from 'react-router-dom'
import serverConfig from '../../ServerConfig'
import { toast } from 'react-toastify'

const EditNote = () => {
  let [newTitle, setTitle] = useState('')
  let [newNote, setNewNote] = useState('')
  const [oldNote, setOldNote] = useState([])

  const navigate = useNavigate()
  const location = useLocation()

  useEffect(() => {
    const { id } = location.state
    getOldNote(id)
  })

  const getOldNote = (id) => {
    var axios = require('axios')

    var config = {
      method: 'get',
      url: serverConfig.serverURL + '/note/my/' + id,
      headers: {
        token: localStorage.getItem('token'),
      },
    }

    axios(config)
      .then(function (response) {
        const result = response.data
        setOldNote(result['data'][0])
      })
      .catch(function (error) {
        console.log(error)
      })
  }

  const editNote = (id) => {
    if (newTitle.length === 0) {
      newTitle = oldNote.title
    }
    if (newNote.length === 0) {
      newNote = oldNote.content
    }

    var data = JSON.stringify({
      title: newTitle,
      content: newNote,
    })

    var config = {
      method: 'put',
      url: serverConfig.serverURL + '/note/edit/' + id,
      headers: {
        token: localStorage.getItem('token'),
        'Content-Type': 'application/json',
      },
      data: data,
    }

    axios(config)
      .then((response) => {
        const result = response.data
        if (result['status'] === 'success') {
          toast.success('Successfully Updated The Note')
          navigate('/my_notes')
        } else {
          toast.error(result['error'])
        }
      })
      .catch((error) => {
        console.log(error)
      })
  }

  return (
    <div className='container my-5'>
      <div className='row justify-content-center'>
        <div className='text-center col-11 col-sm-11 col-md-8 col-lg-6'>
          <h3>Edit Note</h3>
        </div>
      </div>

      <form>
        <div className='row justify-content-center'>
          <div className='mt-2 col-11 col-sm-11 col-md-8 col-lg-6'>
            <label className='form-label'>Title</label>
            <input
              onChange={(event) => {
                setTitle(event.target.value)
              }}
              type='text'
              defaultValue={oldNote.title}
              className='form-control'
            />
          </div>
        </div>

        <div className='row justify-content-center'>
          <div className='mt-2 col-11 col-sm-11 col-md-8 col-lg-6'>
            <label className='form-label'>Note</label>
            <textarea
              style={{ textAlign: 'justify', textJustify: 'auto' }}
              onChange={(event) => {
                setNewNote(event.target.value)
              }}
              className='form-control'
              defaultValue={oldNote.content}
              rows='7'></textarea>
          </div>
        </div>

        <div className='row justify-content-center'>
          <div className='mt-3 text-center col-11 col-sm-11 col-md-8 col-lg-6'>
            <button
              style={{ width: 200 }}
              onClick={() => editNote(oldNote.id)}
              type='button'
              className='btn btn-primary'>
              Edit Note
            </button>
          </div>
        </div>
      </form>
    </div>
  )
}

export default EditNote
