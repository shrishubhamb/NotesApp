import { Link } from 'react-router-dom'

const Footer = () => {
  const h = window.innerHeight - 60
  console.log(h)

  return (
    <footer
      className='container-fluid text-center sticky-bottom bg-primary py-2 mt-5'
      style={{ position: 'absolute', top: `${h}px` }}>
      <div>
        <Link
          style={{ textDecoration: 'none', color: 'lightgrey' }}
          to='/about'>
          Information about this application
        </Link>
      </div>
    </footer>
  )
}

export default Footer
