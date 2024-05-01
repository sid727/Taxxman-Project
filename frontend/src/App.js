import React from "react"
import { BrowserRouter as Router, Route, Switch } from "react-router-dom"
import { Container } from "react-bootstrap"
import Header from "./components/Header"
import Footer from "./components/Footer"
import HomeScreen from "./screens/HomeScreen"
import UserScreen from "./screens/UserScreen"
import AdminScreen from "./screens/AdminScreen"

const App = () => {
  return (
    <Router>
      <Header />
      <main className='py-4'>
        <Container>
          <Switch>
            <Route path='/' component={HomeScreen} exact />
            <Route path='/user' component={UserScreen} />
            <Route path='/admin' component={AdminScreen} />
          </Switch>
        </Container>
      </main>
      <Footer />
    </Router>
  )
}

export default App
