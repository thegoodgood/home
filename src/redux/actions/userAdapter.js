import {
  getUserAction,
  createUserAction,
  deleteUserAction,
  loginUserAction,
} from '../redux/actions/UserActions';

import {BASE_URL} from '.../ApiConstants'


//-------------FETCH USERS

export const getUserFromDB = () => dispatch => {
  fetch(`${BASE_URL}/get_user`)
    .then(r => r.json())
    .then(user => {
      dispatch(getUserAction(user));
    });
};

//--------------------CREATE NEW USERS
const createUserConfig = user => ({
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    Accepts: 'application/json',
  },
  body: JSON.stringify(user),
});

export const createUserToDB = user => dispatch => {
  fetch(`${BASE_URL}/users`, createUserConfig(user))
    .then(r => r.json())
    .then(data => {
      dispatch(createUserAction(data.user));
      localStorage.setItem('token', data.jwt);
    });
};

//-------------------------------- USER LOGIN
const loginUserConfig = user => ({
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    Accepts: 'application/json',
  },
  body: JSON.stringify(user),
});

export const loginUserToDB = user => dispatch => {
  fetch(`${BASE_URL}/login`, loginUserConfig(user))
    .then(r => r.json())
    .then(data => {
      dispatch(loginUserAction(data.user));
      localStorage.setItem('token', data.jwt);
    });
};

//-------------------------------- PERSIST USER LOGIN

const getUserConfig = () => ({
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    Accepts: 'application/json',
    Authorization: `Bearer ${localStorage.getItem('token')}`,
  },
});

export const persistUserFromDB = () => dispatch => {
  fetch(`${BASE_URL}/auth`, getUserConfig())
    .then(r => r.json())
    .then(data => {
      dispatch(getUserAction(data));
    });
};

// 'Authorization': `Bearer ${localStorage.getItem('token')}`

// get show user
export const fetchUserFromDB = id => {
  return fetch(`${BASE_URL}/users/${id}`)
  .then(r => r.json());
};
