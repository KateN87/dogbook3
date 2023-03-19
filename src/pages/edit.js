import { useParams, Link } from 'react-router-dom';
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { editDog } from '../reducers/dogReducer';
import EditForm from '../Components/EditForm';

const Edit = () => {
    const dispatch = useDispatch();
    const { dogId } = useParams();
    const dogIdNumber = Number(dogId);
    const dogObj = useSelector((state) =>
        state.dogReducer.find((dog) => dog.id === dogIdNumber)
    );

    console.log(dogObj);
    const [isActive, setActive] = useState(true);

    const handleOk = () => {
        setActive(true);
    };

    return (
        <div className='container row'>
            <img src={dogObj.image} className='newImg'></img>
            <EditForm dogObj={dogObj} setActive={setActive} />
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
