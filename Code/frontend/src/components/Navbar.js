import { Link, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { signout } from '../slices/authSlice'
import { useRef } from 'react'

const Navbar = () => {
  const signinStatus = useSelector((state) => state.authSlice.status)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const navButton = useRef(null)
  const linksContainerRef = useRef(null)

  function collapseNav() {
    navButton.current.classList.add('collapsed')
    linksContainerRef.current.classList.remove('show')
  }

  return (
    <nav className='navbar navbar-expand-sm bg-primary navbar-dark'>
      <div className='container-fluid'>
        <Link
          onClick={collapseNav}
          style={{ padding: '10px' }}
          className='navbar-brand fw-bold fs-4'
          to='/'>
          NotesApp
        </Link>
        <button
          ref={navButton}
          style={{ paddingRight: '10px' }}
          className='navbar-toggler navbar-toggler-right'
          type='button'
          data-bs-toggle='collapse'
          data-bs-target='#navbarNavAltMarkup'
          aria-controls='navbarNavAltMarkup'
          aria-expanded='false'
          aria-label='Toggle navigation'>
          <span className='navbar-toggler-icon'></span>
        </button>

        <div
          ref={linksContainerRef}
          className='collapse navbar-collapse'
          id='navbarNavAltMarkup'>
          <div className='navbar-nav'>
            <Link
              onClick={collapseNav}
              className='nav-link'
              style={{ padding: '10px' }}
              to='/about'>
              About
            </Link>
          </div>

          {signinStatus && (
            <div className='navbar-nav'>
              <Link
                onClick={collapseNav}
                className='nav-link'
                style={{ padding: '10px' }}
                to='/my_notes'>
                My Notes
              </Link>
              <Link
                onClick={collapseNav}
                className='nav-link'
                style={{ padding: '10px' }}
                to='/note/new'>
                Add A Note
              </Link>
            </div>
          )}

          <div className='navbar-nav ms-auto'>
            {!signinStatus && (
              <Link
                onClick={collapseNav}
                className='nav-link'
                style={{ padding: '10px' }}
                to='/signin'>
                SignIn
              </Link>
            )}
            {!signinStatus && (
              <Link
                onClick={collapseNav}
                className='nav-link'
                style={{ padding: '10px' }}
                to='/signup'>
                SignUp
              </Link>
            )}

            {signinStatus && (
              <Link
                onClick={collapseNav}
                className='nav-link'
                style={{ padding: '10px' }}
                to='/profile'>
                Profile
              </Link>
            )}

            {signinStatus && (
              <button
                onClick={() => {
                  dispatch(signout())
                  navigate('/signin')
                  collapseNav()
                }}
                className='btn btn-light fw-bold'
                type='button'
                style={{
                  border: 'none',
                  background: 'none',
                  color: 'white',
                  padding: '10px',
                  textAlign: 'left',
                }}>
                SignOut
              </button>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
