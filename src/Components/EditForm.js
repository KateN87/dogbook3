import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { editDog } from '../reducers/dogReducer';

const EditForm = ({ setActive }) => {
    const dispatch = useDispatch();
    const { dogId } = useParams();
    const dogObj = useSelector((state) =>
        state.dogReducer.find((dog) => dog.id === Number(dogId))
    );

    const dogList = useSelector((state) => state.dogReducer);

    const addFriend = (e) => {
        const updatedDog = {
            ...dogObj,
            friends: [...dogObj.friends, e.target.value],
        };

        dispatch(editDog(updatedDog));
    };

    const removeFriend = (friendName) => {
        const updatedDog = {
            ...dogObj,
            friends: dogObj.friends.filter((friend) => friend !== friendName),
        };
        dispatch(editDog(updatedDog));
    };

    const submitHandler = async (event) => {
        event.preventDefault();
        const { name, nick, age, bio } = event.target;

        const updatedDog = {
            name: name.value,
            nick: nick.value,
            age: Number(age.value),
            bio: bio.value,
            friends: dogObj.friends,
            image: dogObj.image,
            present: dogObj.present,
            id: dogObj.id,
        };

        try {
            const resp = await fetch(`/api/${dogObj.id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(updatedDog),
            });

            if (resp.status !== 200) {
                console.log('wrong!');
            }
            dispatch(editDog(updatedDog));
            setActive(false);
            event.target.reset();
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <form className='user-info' onSubmit={submitHandler}>
            <div className='form-div'>
                <h1>Edit {dogObj.name}</h1>
            </div>
            <div className='form-div'>
                <label htmlFor='name'>Name: </label>
                <input type='text' id='name' defaultValue={dogObj.name} />
            </div>
            <div className='form-div'>
                <label htmlFor='nick'>Nick: </label>
                <input type='text' id='nick' defaultValue={dogObj.nick} />
            </div>
            <div className='form-div'>
                <label htmlFor='age'>Age: </label>
                <input
                    type='number'
                    min='0'
                    max='25'
                    id='age'
                    defaultValue={dogObj.age}
                />
            </div>
            <div className='form-div'>
                <label htmlFor='bio'>Bio: </label>
                <textarea id='bio' rows='2' defaultValue={dogObj.bio} />
            </div>
            <div className='form-div'>
                <div className='form-div column'>
                    <label htmlFor='friends'>Friends: </label>
                    <select id='friends' size='3' multiple onClick={addFriend}>
                        {dogList.map((dog) => (
                            <option key={dog.name} value={dog.name}>
                                {dog.name}
                            </option>
                        ))}
                    </select>
                </div>

                <ul className='friendList'>
                    {dogObj.friends.map((dog) => (
                        <div key={dog} className='edit-friends'>
                            <li className='pawprint'>{dog}</li>
                            <button
                                id='removeDog'
                                onClick={() => removeFriend(dog)}
                            >
                                X
                            </button>
                        </div>
                    ))}
                </ul>
            </div>
            <input type='submit' value='Save Edit' />
        </form>
    );
};

export default EditForm;
