import { useSelector, useDispatch } from "react-redux";
import { addDog } from "../reducers/dogReducer";
import { useState } from "react";

const NewForm = ({ newImage, setActive }) => {
	const dogList = useSelector((state) => state.dogReducer);
	const dispatch = useDispatch();
	const [friendList, setFriendList] = useState([]);

	const addFriend = (e) => {
		const friends = e.target.value;
		setFriendList([...friendList, friends]);
	};

	const removeFriend = (friendName) => {
		setFriendList([...friendList.filter((friend) => friend !== friendName)]);
	};

	const submitHandler = async (e) => {
		e.preventDefault();

		if (e.target.checkValidity()) {
			const { name, nick, age, bio } = e.target;

			const newDog = {
				name: name.value,
				nick: nick.value,
				age: Number(age.value),
				bio: bio.value,
				friends: friendList,
				image: newImage,
				present: false,
			};

			try {
				const resp = await fetch("api/", {
					method: "POST",
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify(newDog),
				});
				const json = await resp.json();
				if (resp.status !== 200) {
					console.log("Ooops, something went wrong");
				}
				dispatch(addDog(json));
				setActive(false);
				e.target.reset();
			} catch (error) {
				console.error(error);
			}
		}
	};
	return (
		<form className='user-info' onSubmit={submitHandler}>
			<div className='form-div'>
				<h1>New dog</h1>
			</div>
			<div className='form-div'>
				<label htmlFor='name'>Name: </label>
				<input type='text' id='name' required />
			</div>
			<div className='form-div'>
				<label htmlFor='nick'>Nick: </label>
				<input type='text' id='nick' required />
			</div>
			<div className='form-div'>
				<label htmlFor='age'>Age: </label>
				<input type='number' min='0' max='25' id='age' required />
			</div>
			<div className='form-div'>
				<label htmlFor='bio'>Bio: </label>
				<textarea id='bio' rows='2' required />
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
					{friendList.map((dog) => (
						<div key={dog} className='edit-friends'>
							<li className='pawprint'>{dog}</li>
							<button id='removeDog' onClick={() => removeFriend(dog)}>
								X
							</button>
						</div>
					))}
				</ul>
			</div>
			<input type='submit' value='Save Dog' />
		</form>
	);
};

export default NewForm;
