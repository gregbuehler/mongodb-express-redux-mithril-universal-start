const LOADALL = 'my-app/user/LOADALL';
const LOAD = 'my-app/user/LOAD';
const CREATE = 'my-app/user/CREATE';
const UPDATE = 'my-app/user/UPDATE';
const REMOVE = 'my-app/user/REMOVE';


function reducer(state, action) {
    switch (action.type) {

        case CREATE:
            state.users.unshift(action.user);
            return state;

        case UPDATE:
            state.users = state.users.map(function(user) {
                if (user.userid === action.user.userid) {
                    return action.user;
                }
                return user;
            })
            return state;

        case REMOVE:
            state.users = state.users.filter(function(user) {
                return user.userid !== action.userid
            })
            return state;

        default:
            return state;
    }
}

function loadUsers() {
    return {
        type: LOADALL
    };
}

function loadUser(id) {
    return {
        type: LOAD,
        id: id
    };
}

function createUser(user) {
    return {
        type: CREATE,
        user: user
    };
}

function updateUser(user) {
    return {
        type: UPDATE,
        user: user
    };
}

function removeUser(id) {
    return {
        type: REMOVE,
        id: id
    };
}

module.exports = {
    reducer: reducer,
    loadUsers: loadUsers,
    loadUser: loadUser,
    createUser: createUser,
    updateUser: updateUser,
    removeUser: removeUser
}
