import uniqid from 'uniqid';

const initialState = [
    {
        name: 'Adler',
        nick: 'Adler',
        age: 12,
        bio: 'Äta, sova, gosa',
        friends: ['Laban'],
        image: '/images/Adler.png',
        present: true,
        id: 1,
    },
    {
        name: 'Inja',
        nick: 'Inja',
        age: 4,
        bio: 'Äta, sova, gosa',
        friends: ['Adler', 'Link', 'Fendi'],
        image: '/images/Inja.jpg',
        present: true,
        id: 2,
    },
    {
        id: 3,
        name: 'Tage',
        nick: 'Tage',
        age: 5,
        bio: 'Äta, sova, gosa',
        friends: ['Laban'],
        image: '/images/Tage.jpg',
        present: false,
    },
    {
        id: 4,
        name: 'Bosse',
        nick: 'Bosse',
        age: 10,
        bio: 'Äta, sova, gosa',
        friends: ['Laban'],
        image: '/images/Bosse.jpg',
        present: false,
    },
];

const dogReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'DELETE_DOG':
            const { id, name } = action.payload;

            const newState = state.filter((dog) => dog.id !== id);

            const updatedState = newState.map((dog) => ({
                ...dog,
                friends: dog.friends.filter((friend) => friend !== name),
            }));
            return updatedState;
        case 'ADD_DOG':
            return [...state, action.payload];
        case 'EDIT_PRESENT':
            return state.map((dog) => {
                if (dog.id === action.payload.id) {
                    return { ...dog, present: !dog.present };
                } else {
                    return dog;
                }
            });
        case 'EDIT_FRIEND':
            return state.map((dog) => {
                if (dog.id === action.payload.id) {
                    return {
                        ...dog,
                        friends: [...dog.friends, action.payload.friend],
                    };
                } else {
                    return dog;
                }
            });
        case 'EDIT_DOG':
            return state.map((dog) => {
                if (dog.id === action.payload.id) {
                    return action.payload;
                } else {
                    return dog;
                }
            });
        default: //HOME
            return state;
    }
};

export const addDog = ({ name, nick, age, bio, friends, image, present }) => {
    const action = {
        type: 'ADD_DOG',
        payload: {
            id: uniqid(),
            name,
            nick,
            age,
            bio,
            friends,
            image,
            present,
        },
    };
    return action;
};

export const deleteDog = (id, name) => {
    const action = {
        type: 'DELETE_DOG',
        payload: {
            id,
            name,
        },
    };
    return action;
};

export const editPresent = (id) => {
    const action = {
        type: 'EDIT_PRESENT',
        payload: {
            id,
        },
    };
    return action;
};

export const editFriend = (id, friend) => {
    const action = {
        type: 'EDIT_FRIEND',
        payload: {
            id,
            friend,
        },
    };
    return action;
};

export const editDog = ({
    name,
    nick,
    age,
    bio,
    friends,
    image,
    present,
    id,
}) => {
    const action = {
        type: 'EDIT_DOG',
        payload: {
            name,
            nick,
            age,
            bio,
            friends,
            image,
            present,
            id,
        },
    };
    return action;
};

export default dogReducer;

/* return state.map()
db.data.userData.forEach((dog) => {
    dog.friends = dog.friends.filter(
        (friend) => friend !== dogToRemove.name
    );
});

const dogId = Number(req.params.id);
const dogToRemove = db.data.userData.find((dog) => dog.id === dogId);

if (dogToRemove === undefined) {
    res.sendStatus(400);
}

if (dogToRemove) {
    db.data.userData = db.data.userData.filter((dog) => dog.id !== dogId);
} */
