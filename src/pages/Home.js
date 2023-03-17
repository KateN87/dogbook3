import DogCard from '../Components/DogCard.js';

export default function Home({ dogList, setDogList }) {
    return (
        <>
            <div className='dogs'>
                {dogList.map((dog) => (
                    <DogCard
                        dogList={dogList}
                        setDogList={setDogList}
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
