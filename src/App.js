
import './App.css';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom'
import { FaCalendarAlt, FaDoorOpen, FaUsers } from 'react-icons/fa'
import BookablesPage from './Bookables/BookablsPage'
import BookingsPage from './Bookings/BookingsPage.js'
import UserPage from './Users/UserPage.js'
import UserPicker from './Users/UserPicker.js'

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
        <Route path='/bookings' element={<BookingsPage/>}/>
        <Route path='/bookables' element={<BookablesPage/>}/>
        <Route path='/users' element={<UserPage/>}/>
      </Switch>

      </div>
    </Router>


  );
}

export default App;
