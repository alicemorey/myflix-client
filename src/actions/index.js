//list of actions

export const ADD_MOVIE = 'ADD_MOVIE';
export const SET_FILTER= 'SET_FILTER';

export const addMovie =(movie)=>({
    type: ADD_MOVIE,
    payload:movie,

});

export const setFilter =(filter)=>({
    type:SET_FILTER,
    payload:filter
});

