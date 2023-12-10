import {BrowserRouter as Router,Routes,Route} from  'react-router-dom'
import { LoginPage, SignupPage, ForgotPasswordPage, ResetPasswordPage, HomePage} from './pages';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { checkAuthAsync, selectIsAuthChecked, selectLoggedInUser } from './features/auth/AuthSlice';
import {Protected} from './features/auth/components/Protected'
import { Logout } from './features/auth/components/Logout';
import { fetchLoggedInUserByIdAsync } from './features/user/UserSlice';

function App() {
  const dispatch=useDispatch()
  const isAuthChecked=useSelector(selectIsAuthChecked)
  const loggedInUser=useSelector(selectLoggedInUser)

  useEffect(()=>{
    dispatch(checkAuthAsync())
  },[dispatch])

  useEffect(()=>{
    /* when a user is logged in then this dispatches an action to get all the details of loggedInUser, 
    as while login and signup only the bare-minimum information is sent by the server */
    if(loggedInUser){
      dispatch(fetchLoggedInUserByIdAsync(loggedInUser?._id))
    }
  },[loggedInUser])

  return (
    <Router>

      {isAuthChecked && 

      <Routes>

        <Route exact path='/signup' element={<SignupPage/>}/>
        <Route exact path='/login' element={<LoginPage/>}/>
        <Route exact path='/forgot-password' element={<ForgotPasswordPage/>}/>
        <Route exact path='/reset-password/:userId/:passwordResetToken' element={<ResetPasswordPage/>}/>
        <Route exact path='/logout' element={<Logout/>}/>

        <Route exact path='/' element={
          <Protected>
            <HomePage/>
          </Protected>
        }/>

      </Routes>
      }
    </Router>
  );
}

export default App;
