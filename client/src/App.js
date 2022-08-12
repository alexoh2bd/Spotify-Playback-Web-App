import Login from './login';
import 'bootstrap/dist/css/bootstrap.min.css'
import Dashboard from './Dashboard';
const code = new URLSearchParams(window.location.search).get('code');


function App() {
  // if client app has code, render dashboard and pass in code, otherwise render login page
  return code ? <Dashboard code = {code} /> : <Login /> 
  
}

export default App;
