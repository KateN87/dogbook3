import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import UserInfo from '../Components/UserInfo';
import { useSelector, useDispatch } from 'react-redux';

const User = (/* { dogList, setDogList } */) => {
    const dogList = useSelector((state) => state.dogReducer);
    const { dogId } = useParams();
    const dogObj = dogList.find((dog) => dog.id === Number(dogId));

    /* const [dogObj, setDogObj] = useState(null); */

    /* const fetchDog = async () => {
        const resp = await fetch(`/api/user/${dogId}`);
        const json = await resp.json();
        setDogObj(json);
    }; */

    /* useEffect(() => {
        fetchDog();
    }, []); */

    return (
        <div className='container row'>
            {dogObj && <img src={dogObj.image} className='newImg' />}
            {dogObj && (
                <UserInfo
                    /* dogList={dogList}
                    setDogList={setDogList} */
                    dogObj={dogObj}
                />
            )}
        </div>
    );
};

export default User;
