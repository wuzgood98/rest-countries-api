import { Routes, Route } from 'react-router-dom';

import Header from './components/Header';
import ErrorPage from './components/Error';
import Home from './pages/Home';
import Country from './pages/Country';

function App() {

  return (
    <div className='w-full min-h-screen bg-veryLightGray font-nunitoSans dark:bg-veryDarkBlueDM '>
      <Header />
      <Routes>
        <Route exact path='/' element={<Home />} />
        <Route path='/country-details/:name/' element={<Country />} />
        <Route path='*' element={<ErrorPage />} />
      </Routes>
    </div>
  )
}

export default App
