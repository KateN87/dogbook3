import { Link } from 'react-router-dom';

const UserInfo = ({ dogObj, dogList, setDogList }) => {
    const { name, nick, bio, age, present, id, image, friends } = dogObj;

    const handleChecked = async (e) => {
        const updateDog = {
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
        setDogList(newList);
    };

    return (
        <div className='user-info'>
            <h1>{name}</h1>

            <ul>
                <li className='pawprint'> Nick: {nick}</li>
                <li className='pawprint'> Bio: {bio}</li>
                <li className='pawprint'> Age: {age}</li>
                <li className='pawprint'>
                    Friends:
                    <br />
                    {friends.map((dog) => (
                        <>
                            <Link key={name} to={`/user/${dog}`}>
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
                    defaultChecked={present ? true : false}
                    onChange={handleChecked}
                ></input>
            </div>
            <Link to={`/user/${id}/edit`}>
                <button>Edit</button>
            </Link>
        </div>
    );
};

export default UserInfo;
