import {BrowserRouter as Router,Routes,Route} from  'react-router-dom'
import { LoginPage, SignupPage } from './pages';

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path='/signup' element={<SignupPage/>}/>
        <Route exact path='/login' element={<LoginPage/>}/>
      </Routes>
    </Router>
  );
}

export default App;
