const About = () => {
  return (
    <div className='container my-5'>
      <div className='row justify-content-center'>
        <div className='col-10 col-sm-10 col-md-8'>
          <div className='card shadow-lg'>
            <div className='card-body'>
              <h3 className='card-title text-center my-4 text-primary fw-bold'>
                NotesApp Application Details
              </h3>
              <p className='card-text text-center my-3 text-secondary'>
                Created by Shubham Bhosale (shrishubhamb94@gmail.com) using MERN
                stack. <br /> Deployed on{' '}
                <span className='fw-bold text-primary'> AWS EC2 </span> Ubuntu
                instance using{' '}
                <span className='fw-bold text-primary'> Docker </span>container.
                To know more about this app visit git{' '}
                <a
                  className='link-secondary'
                  href='https://github.com/shrishubhamb/NotesApp'
                  target='_blank'
                  rel="noreferrer">
                  repository
                </a>
                .
              </p>
              <hr />
              <h5 className='text-center text-primary fw-bold mb-3'>Stack</h5>
              <div className='d-flex justify-content-center'>
                <ul className='list text-secondary'>
                  <li className='list'>Database : MySQL</li>
                  <li className='list'>Server : Express js</li>
                  <li className='list'>Front End : React js</li>
                  <li className='list'>Back End : Node js</li>
                </ul>
              </div>
              <hr />
              <h5 className='text-center text-primary fw-bold mb-3'>
                Salient Features
              </h5>
              <div className='d-flex justify-content-center'>
                <ul className='list text-secondary'>
                  <li className='list'>
                    Single page application using ReactJS
                  </li>
                  <li className='list'>Responsive UI using Bootstrap 5</li>
                  <li className='list'>
                    Authentication and authorization using JSON Web Token
                  </li>
                  <li className='list'>
                    Authentication state management using React-Redux
                  </li>
                  <li className='list'>Password encryption using crypto-js</li>
                  <li className='list'>
                    Password reset via email OTP using Nodemailer
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default About
