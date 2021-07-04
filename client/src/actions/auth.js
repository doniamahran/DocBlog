import axios from 'axios';
import setAuthToken from '../utils/setAuthToken';
import { setAlert } from './alert';
import { REGISTER_SUCSSES, REGISTER_FAIL, USER_LOADED, AUTH_ERROR, LOGIN_SUCSSES, LOGIN_FAIL, LOGOUT, LOGOUT_FAIL, CLEAR_PROFILE } from './types';


// Load user

export const loadUser = () => async dispatch => {
    if (localStorage.token) {
        setAuthToken(localStorage.token);
    }

    try {
        const res = await axios.get('api/auth');
        dispatch({
            type: USER_LOADED,
            payload: res.data
        })

        dispatch(loadUser());


    } catch (error) {
        dispatch({
            type: AUTH_ERROR
        })
    }
}



// Register user

export const register = ({ name, email, password }) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json',
            //Authorization: `Bearer ${localStorage.token}`
        }
    }
    console.log(email, password);
    const body = JSON.stringify({ name, email, password });

    try {
        const res = await axios.post('api/users', body, config)

        dispatch({
            type: REGISTER_SUCSSES,
            payload: res.data
        });
        // dispatch(loadUser());
    } catch (error) {
        const errors = error.response.data.errors;

        if (errors) {
            errors.forEach(error => {
                //dispatch(setAlert(error.msg, 'danger'))
                console.log(error.msg)

            });
        }

        dispatch({
            type: REGISTER_FAIL
        });
    }
}




// Login user

export const login = (email, password) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json',
            //Authorization: `Bearer ${localStorage.token}`
        }
    }


    const body = JSON.stringify({ email, password });

    try {
        const res = await axios.post('api/auth', body, config)

        dispatch({
            type: LOGIN_SUCSSES,
            payload: res.data
        });
        dispatch(loadUser());
    } catch (error) {
        const errors = error.response.data.errors;

        if (errors) {
            errors.forEach(error =>
                //dispatch(setAlert(error.msg, 'danger'))
                console.log(error.msg)
            );
        }

        dispatch({
            type: LOGIN_FAIL
        });
    }
};


//LOGOUT - clear Profile

export const logout = () => dispatch => {
    dispatch({ type: CLEAR_PROFILE })
    dispatch({ type: LOGOUT })
}