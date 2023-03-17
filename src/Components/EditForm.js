const EditForm = ({ dogObj, setDogList, dogList, findIndex, setActive }) => {
    const addFriend = (e) => {
        dogObj.friends.push(e.target.value);
        setDogList([...dogList, dogObj]);
    };

    const submitHandler = async (event) => {
        event.preventDefault();
        const { name, nick, age, bio } = event.target;

        const updateDog = {
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
                body: JSON.stringify(updateDog),
            });
            const json = await resp.json();
            if (resp.status !== 200) {
                console.log('wrong!');
            }
            setDogList(json);
            setActive(false);
            event.target.reset();
        } catch (error) {
            console.error(error);
        }
    };
    /*
        const newList = [...dogList];
        newList[findIndex] = updateDog; */ return (
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
                <ul>
                    {dogObj.friends.map((dog) => (
                        <li key={dog} className='pawprint'>
                            {dog}
                        </li>
                    ))}
                </ul>
            </div>
            <input type='submit' value='Save Edit' />
        </form>
    );
};

export default EditForm;
