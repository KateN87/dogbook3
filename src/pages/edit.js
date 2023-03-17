import { useParams, Link } from 'react-router-dom';
import { useState } from 'react';
import EditForm from '../Components/EditForm';

const Edit = ({ dogList, setDogList }) => {
    const { dogId } = useParams();
    const dogIdNumber = Number(dogId);

    const [isActive, setActive] = useState(true);

    const findIndex = dogList.findIndex((dog) => dog.id === dogIdNumber);
    let dogObj = dogList[findIndex];

    const handleOk = () => {
        setActive(true);
    };

    return (
        <div className='container row'>
            <img src={dogObj.image} className='newImg'></img>
            <EditForm
                dogObj={dogObj}
                setDogList={setDogList}
                dogList={dogList}
                findIndex={findIndex}
                setActive={setActive}
            />
            <div className={`ok-container ${isActive ? 'invisible' : ''}`}>
                <p>Dog edited!</p>
                <Link to={`/user/${dogIdNumber}`}>
                    <button onClick={handleOk}>OK</button>
                </Link>
            </div>
        </div>
    );
};

export default Edit;
