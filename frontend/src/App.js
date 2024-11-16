import { Container } from 'react-bootstrap'

import HomeScreen from './screens/HomeScreen'

import Header from './components/Header'
import Footer from './components/Footer'

import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";

function App() {
  return (
    <div>
      <Router>
        <Header/>
          <main className="py-3">
            <Container>
              <Routes> 
                <Route path='/' element={<HomeScreen/>} exact />
              </Routes> 
            </Container>
          </main>
        <Footer/>
      </Router>
    </div>
);  
}

export default App;

