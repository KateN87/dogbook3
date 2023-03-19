import './App.css';
import Header from './Components/Header.js';
import { Route, Routes } from 'react-router-dom';
import { useSelector } from 'react-redux';

import Home from './pages/Home';
import NewDog from './pages/NewDog';

import User from './pages/userPage';
import Edit from './pages/edit';

function App() {
    return (
        <div className='App'>
            <Header />
            <Routes>
                <Route path='/' element={<Home />} />

                <Route path='/NewDog' element={<NewDog />} />

                <Route path='/user/:dogId' element={<User />} />
                <Route path='/user/:dogId/edit' element={<Edit />} />
            </Routes>
        </div>
    );
}

export default App;
