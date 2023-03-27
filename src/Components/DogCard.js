import { TiDelete } from "react-icons/ti";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { deleteDog } from "../reducers/dogReducer";

const DogCard = (props) => {
	const { name, image, present, id } = props;
	const dispatch = useDispatch();

	const removeDog = async (id) => {
		try {
			const resp = await fetch(`api/${id}`, {
				method: "DELETE",
			});
			const json = await resp.json();

			const dogId = json.id;
			const dogName = json.name;

			if (resp.status === 200) {
				dispatch(deleteDog(dogId, dogName));
			} else {
				console.log("Oh no", resp.status);
			}
		} catch (error) {
			console.error(error);
		}
	};

	return (
		<>
			<div className='card'>
				<Link to={`/user/${id}`}>
					<img src={image} className='card-img-top' alt='...' />
				</Link>
				<div className='card-body'>
					<p className={present ? "present" : "notPresent"}>{name}</p>
					<TiDelete className='delete-x' onClick={() => removeDog(id)} />
				</div>
			</div>
		</>
	);
};

export default DogCard;
