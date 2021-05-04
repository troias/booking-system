
import './App.css';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom'
import { FaCalendarAlt, FaDoorOpen, FaUsers } from 'react-icons/fa'
import BookablesPage from './components/Bookables/BookablesPage'
import BookingsPage from './components/Bookings/BookingsPage'
import UserPage from './components/Users/UserPage'
import UserPicker from './components/Users/UserPicker'

function App() {
  return (
    <Router>
      <div className="App">
       
          
      
        <header>
          <nav  >
            <ul className='flex'>
              <li className="flex-li">
                <Link to="/bookings" className="btn btn-header">
                  <FaCalendarAlt />
                  <span>Bookings</span>
                </Link>
              </li>
              <li className="flex-li">
                <Link to="/bookables" className="btn btn-header">
                  <FaDoorOpen />
                  <span>Bookables</span>
                </Link>
              </li>
              <li className="flex-li">
                <Link to="/users" className="btn btn-header">
                  <FaUsers />
                  <span>Users</span>
                </Link>
              </li>
            </ul>
          </nav>
          <UserPicker />
        </header>
        
      <Switch>
        <Route path='/bookings' component={BookingsPage}/>
        <Route path='/bookables' component={BookablesPage}/>
        <Route path='/users' component={UserPage}/>
      </Switch>

      </div>
    </Router>


  );
}

export default App;
