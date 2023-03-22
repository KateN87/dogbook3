const dogReducer = (state = [], action) => {
    switch (action.type) {
        case 'GET_DOGS':
            return action.payload;

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

        case 'EDIT_DOG':
            return state.map((dog) => {
                if (dog.id === action.payload.id) {
                    return action.payload;
                } else {
                    return dog;
                }
            });
        default:
            return state;
    }
};

export const addDog = ({
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
        type: 'ADD_DOG',
        payload: {
            id,
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
