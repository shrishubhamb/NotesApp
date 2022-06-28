import { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import serverConfig from '../../ServerConfig'

const NewNote = () => {
  const [title, setTitle] = useState('')
  const [newNote, setNewNote] = useState('')

  const navigate = useNavigate()

  const newnote = () => {
    if (title.length === 0) {
      toast.error('Please enter title')
    } else if (newNote.length === 0) {
      toast.error('Please enter note')
    } else {
      var data = JSON.stringify({
        title: title,
        content: newNote,
      })

      var config = {
        method: 'post',
        url: serverConfig.serverURL + '/note/new',
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
            toast.success('Successfully added a new nome')
            navigate('/my_notes')
          } else {
            toast.error(result['error'])
          }
        })
        .catch((error) => {
          console.log(error)
        })
    }
  }

  return (
    <div className='container my-5'>
      <div className='row justify-content-center'>
        <div className='text-center col-11 col-sm-11 col-md-8 col-lg-6'>
          <h3>Add A Note</h3>
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
              className='form-control'
            />
          </div>
        </div>

        <div className='row justify-content-center'>
          <div className='mt-3 col-11 col-sm-11 col-md-8 col-lg-6'>
            <div className='mb-3'>
              <label className='form-label'>Note</label>
              <textarea
                onChange={(event) => {
                  setNewNote(event.target.value)
                }}
                className='form-control'
                rows='7'></textarea>
            </div>
          </div>
        </div>

        <div className='row justify-content-center'>
          <div className='mt-3 text-center col-11 col-sm-11 col-md-8 col-lg-6'>
            <button
              style={{ width: 200 }}
              onClick={newnote}
              type='button'
              className='btn btn-primary'>
              Add Note
            </button>
          </div>
        </div>
      </form>
    </div>
  )
}

export default NewNote
