import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { editPresent } from '../reducers/dogReducer';

const UserInfo = () => {
    const dispatch = useDispatch();
    const { dogId } = useParams();
    const dogObj = useSelector((state) =>
        state.dogReducer.find((dog) => dog.id === Number(dogId))
    );

    return (
        <div className='user-info'>
            <h1>{dogObj.name}</h1>

            <ul>
                <li key={dogObj.nick} className='pawprint'>
                    {' '}
                    Nick: {dogObj.nick}
                </li>
                <li key={dogObj.bio} className='pawprint'>
                    {' '}
                    Bio: {dogObj.bio}
                </li>
                <li key={dogObj.age} className='pawprint'>
                    {' '}
                    Age: {dogObj.age}
                </li>
                <li key={dogObj.id} className='pawprint'>
                    Friends:
                    <br />
                    {dogObj.friends.map((dog) => (
                        <>
                            <Link key={dogObj.name} to={`/user/${dog}`}>
                                {dog}
                            </Link>
                            <br />
                        </>
                    ))}
                </li>
            </ul>
            <div>
                <label htmlFor='presentBox'>Present:</label>
                <input
                    id='presentBox'
                    type='checkbox'
                    defaultChecked={dogObj.present}
                    onChange={() => {
                        dispatch(editPresent(dogObj.id));
                    }}
                ></input>
            </div>
            <Link to={`/user/${dogId}/edit`}>
                <button>Edit</button>
            </Link>
        </div>
    );
};

export default UserInfo;

//const handleChecked = async (e) => {
/* const updateDog = {
        name,
        nick,
        age,
        bio,
        friends,
        image,
        present: e.target.checked,
        id,
    };
    try {
        await fetch(`api/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(updateDog),
        });
    } catch (error) {}
    const newList = [...dogList];
    const findIndex = newList.findIndex((dog) => dog.name === name);
    newList[findIndex].present = e.target.checked;
    setDogList(newList); */
//};
