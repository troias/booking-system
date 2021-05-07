
import './App.css';
import {useState, useEffect} from 'react'
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom'
import { FaCalendarAlt, FaDoorOpen, FaUsers } from 'react-icons/fa'
import BookablesPage from './components/Bookables/BookablesPage'
import BookingsPage from './components/Bookings/BookingsPage'
import UserPage from './components/Users/UserPage'
import UserPicker from './components/Users/UserPicker'


function App() {
  const name = ["troy", "troias", "maximus"]
  const [index, setIndex] = useState(0)

  useEffect(() => {
    document.title = name[index]
  })

  const updateHandler = () => {
    setIndex(Math.floor(Math.random() * name.length))
  }

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
          <button onClick={updateHandler}>
          change Title
          </button>
          <UserPicker />
          <WindowSize/>
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

const getSize = () => {
  return {
    width: window.innerWidth, 
    height: window.innerHeight
  }
}

const WindowSize = () => {
  const [ size, setSize ] = useState(getSize())


  useEffect(()=> {
    const handleResize = () => {
      setSize(getSize())
    }
    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])
  return <p>Width: {size.width} , Height {size.height}</p>

}

export default App;
