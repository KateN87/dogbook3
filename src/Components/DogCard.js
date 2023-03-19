import { TiDelete } from 'react-icons/ti';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { deleteDog } from '../reducers/dogReducer';

const DogCard = (props) => {
    const { name, image, present, id } = props;
    const dispatch = useDispatch();
    /* const removeDog = async (id) => {
                try {
            const resp = await fetch(`api/${id}`, {
                method: 'DELETE',
            });
            const json = await resp.json();
            setDogList(json);
        } catch (error) {
            console.error(error);
        }

    }*/ return (
        <>
            <div className='card'>
                <Link to={`/user/${id}`}>
                    <img src={image} className='card-img-top' alt='...' />
                </Link>
                <div className='card-body'>
                    <p className={present ? 'present' : 'notPresent'}>{name}</p>
                    <TiDelete onClick={() => dispatch(deleteDog(id, name))} />
                </div>
            </div>
        </>
    );
};

export default DogCard;
