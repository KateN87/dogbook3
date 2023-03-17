import './App.css';
import Header from './Components/Header.js';
import { useState, useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import NewDog from './pages/NewDog';
import User from './pages/userPage';
import Edit from './pages/edit';

function App() {
    const [dogList, setDogList] = useState([]);

    const fetchDogs = async () => {
        const resp = await fetch('/api');
        const json = await resp.json();
        setDogList(json);
    };

    useEffect(() => {
        fetchDogs();
    }, []);

    return (
        <div className='App'>
            <Header />
            <Routes>
                <Route
                    path='/'
                    element={<Home dogList={dogList} setDogList={setDogList} />}
                />

                <Route
                    path='/NewDog'
                    element={
                        <NewDog dogList={dogList} setDogList={setDogList} />
                    }
                />
                <Route
                    path='/user/:dogId'
                    element={<User dogList={dogList} setDogList={setDogList} />}
                />
                <Route
                    path='/user/:dogId/edit'
                    element={<Edit dogList={dogList} setDogList={setDogList} />}
                />
            </Routes>
        </div>
    );
}

export default App;
