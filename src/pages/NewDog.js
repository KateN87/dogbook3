import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import NewForm from '../Components/NewForm';

export default function NewDog({ dogList, setDogList }) {
    const [isActive, setActive] = useState(true);
    const [newImage, setNewImage] = useState();
    useEffect(() => {
        async function fetchImage() {
            const resp = await fetch('https://dog.ceo/api/breeds/image/random');
            const json = await resp.json();
            setNewImage(json.message);
        }
        fetchImage();
    }, []);

    return (
        <div className='container row'>
            <img src={newImage} className='newImg'></img>
            <NewForm
                setDogList={setDogList}
                setActive={setActive}
                dogList={dogList}
                newImage={newImage}
            />

            <div className={`ok-container ${isActive ? 'invisible' : ''}`}>
                <p>Dog added!</p>
                <Link to='/'>
                    <button onClick={() => setActive(true)}>OK</button>
                </Link>
            </div>
        </div>
    );
}
