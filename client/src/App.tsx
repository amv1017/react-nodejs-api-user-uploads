import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import NavBar from './components/NavBar'
import Account from './components/Account'
import Users from './components/Users'
import { _ROUTE_ACCOUNT, _ROUTE_PEOPLE } from './routes'
import Homepage from './components/Homepage'

const App = () => {
  return (
    <>
      <Router>
        <NavBar />
        <Routes>
          <Route path={'/'} element={<Homepage />} />
          <Route path={_ROUTE_ACCOUNT} element={<Account />} />
          <Route path={_ROUTE_PEOPLE} element={<Users />} />
        </Routes>
      </Router>
    </>
  )
}

export default App
