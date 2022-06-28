import { Routes, Route, HashRouter } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Navbar from './components/Navbar'
import SignIn from './pages/user/SignIn'
import SignUp from './pages/user/SignUp'
import Home from './pages/general/Home'
import About from './pages/general/About'
import MyNotes from './pages/note/MyNotes'
import NoteDetails from './pages/note/NoteDetails'
import NewNote from './pages/note/NewNote'
import Profile from './pages/user/Profile'
import EditNote from './pages/note/EditNote'
import PageNotFound from './pages/general/PageNotFound'
import UpdateProfile from './pages/user/UpdateProfile'
import UpdatePassword from './pages/user/UpdatePassword'
import DeleteUser from './pages/user/DeleteUser'
import ForgotPassword from './pages/user/ForgotPassword'
import ResetPassword from './pages/user/ResetPassword'

function App() {
  return (
    <div>
    <HashRouter>
      <Navbar />
      
      <Routes >
        <Route path='/' element={<Home />} />
        <Route path='/home' element={<Home />} />
        <Route path='/about' element={<About />} />

        <Route path='/signin' element={<SignIn />} />
        <Route path='/signup' element={<SignUp />} />
        <Route path='/profile' element={<Profile />} />
        <Route path='/profile/update' element={<UpdateProfile />} />
        <Route path='/update_password' element={<UpdatePassword />} />
        <Route path='/forgot_password' element={<ForgotPassword />} />
        <Route path='/profile/delete' element={<DeleteUser />} />
        <Route path='/reset' element={<ResetPassword />} />
        
        <Route path='/my_notes' element={<MyNotes />} />
        <Route path='/note' element={<NoteDetails />} />
        <Route path='/note/new' element={<NewNote />} />
        <Route path='/note/edit' element={<EditNote />} />

        <Route path='*' element={<PageNotFound />} />
      </Routes>

      <ToastContainer
        position='top-center'
        autoClose={800}
        hideProgressBar
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss={false}
        draggable
        pauseOnHover={false}
      />
    </HashRouter></div>
  )
}

export default App
