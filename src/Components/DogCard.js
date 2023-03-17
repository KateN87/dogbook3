import { TiDelete } from 'react-icons/ti';
import { Link } from 'react-router-dom';

const DogCard = (props) => {
    const { name, image, present, dogList, setDogList, id } = props;
    const removeDog = async (id) => {
        try {
            const resp = await fetch(`api/${id}`, {
                method: 'DELETE',
            });
            const json = await resp.json();
            setDogList(json);
        } catch (error) {
            console.error(error);
        }

        /*         const newList = dogList.filter((dog) => dog.id !== id);
        setDogList(newList); */
    };

    return (
        <>
            <div className='card'>
                <Link to={`/user/${id}`}>
                    <img src={image} className='card-img-top' alt='...' />
                </Link>
                <div className='card-body'>
                    <p className={present ? 'present' : 'notPresent'}>{name}</p>
                    <TiDelete onClick={() => removeDog(id)} />
                </div>
            </div>
        </>
    );
};

export default DogCard;
