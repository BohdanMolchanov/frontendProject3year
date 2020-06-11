import { BehaviorSubject } from 'rxjs';

import config from 'config';
import { authHeader, handleResponse } from '@/_helpers';

const currentUserSubject = new BehaviorSubject(JSON.parse(localStorage.getItem('currentUser')));

export const authenticationService = {
    login,
    logout,
    registerOwner,
    registerEmployee,
    currentUser: currentUserSubject.asObservable(),
    get currentUserValue () { return currentUserSubject.value }
};

function login(username, password) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
    };

    return fetch(`${config.apiUrl}/auth/authenticate`, requestOptions)
        .then(handleResponse)
        .then(user => {
            // store user details and jwt token in local storage to keep user logged in between page refreshes
            localStorage.setItem('currentUser', JSON.stringify(user));
            currentUserSubject.next(user);

            return user;
            },
            error => {
                console.log(`Couldn't reach the API. ${error}`);
                return null;
        });
}
function registerOwner(email, password, firstName, lastName, secondName){
    const requestOptions = {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({email, password, firstName, lastName, secondName})
    }
    return fetch(`${config.apiUrl}/auth/register/owner`, requestOptions)
        .then(handleResponse)
        .then(message => 
            message,
        error => error
    )
}
function registerEmployee(email, password, firstName, lastName, secondName){
    const headers = new Headers(authHeader());
    headers.append('Content-Type', 'application/json');
    const requestOptions = {
        method: 'POST',
        headers: headers,
        body: JSON.stringify({email, password, firstName, lastName, secondName})
    }
    return fetch(`${config.apiUrl}/auth/register/employee`, requestOptions)
        .then(handleResponse)
        .then(message => 
            message,
        error => error
    )
}
function logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('currentUser');
    currentUserSubject.next(null);
}
