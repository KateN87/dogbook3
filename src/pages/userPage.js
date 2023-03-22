import { useParams } from 'react-router-dom';
import UserInfo from '../Components/UserInfo';
import { useSelector } from 'react-redux';

const User = () => {
    const dogList = useSelector((state) => state.dogReducer);
    const { dogId } = useParams();
    const dogObj = dogList.find((dog) => dog.id === Number(dogId));

    if (dogObj) {
        return (
            <div className='container row'>
                <img src={dogObj.image} className='newImg' />
                <UserInfo />
            </div>
        );
    } else {
        return <div>Loading...</div>;
    }
};

export default User;
