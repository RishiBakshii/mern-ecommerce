import {BrowserRouter as Router,Routes,Route} from  'react-router-dom'
import { LoginPage, SignupPage, ForgotPasswordPage, ResetPasswordPage, HomePage} from './pages';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { checkAuthAsync, selectIsAuthChecked, selectLoggedInUser } from './features/auth/AuthSlice';
import {Protected} from './features/auth/components/Protected'
import { Logout } from './features/auth/components/Logout';

function App() {
  const dispatch=useDispatch()
  const isAuthChecked=useSelector(selectIsAuthChecked)
  const loggedInUser=useSelector(selectLoggedInUser)

  useEffect(()=>{
    dispatch(checkAuthAsync())
  },[dispatch])

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
