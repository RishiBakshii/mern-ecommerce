import {BrowserRouter as Router,Routes,Route} from  'react-router-dom'
import { SignupPage } from './pages';

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path='/signup' element={<SignupPage/>}/>
      </Routes>
    </Router>
  );
}

export default App;
