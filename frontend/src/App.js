import {BrowserRouter as Router,Routes,Route} from  'react-router-dom'
import { LoginPage, SignupPage, ForgotPasswordPage, ResetPasswordPage, HomePage} from './pages';

function App() {
  return (
    <Router>
      <Routes>

        <Route exact path='/signup' element={<SignupPage/>}/>
        <Route exact path='/login' element={<LoginPage/>}/>
        <Route exact path='/forgot-password' element={<ForgotPasswordPage/>}/>
        <Route exact path='/reset-password/:userId/:passwordResetToken' element={<ResetPasswordPage/>}/>


        <Route exact path='/' element={<HomePage/>}/>

      </Routes>
    </Router>
  );
}

export default App;
