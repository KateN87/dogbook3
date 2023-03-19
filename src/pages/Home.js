import DogCard from '../Components/DogCard.js';

import { useSelector, useDispatch } from 'react-redux';

export default function Home() {
    const dogList = useSelector((state) => state.dogReducer);
    return (
        <>
            <div className='dogs'>
                {dogList.map((dog) => (
                    <DogCard
                        key={dog.name}
                        name={dog.name}
                        image={dog.image}
                        present={dog.present}
                        id={dog.id}
                    />
                ))}
            </div>
        </>
    );
}
