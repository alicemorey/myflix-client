
import { combineReducers} from 'redux';
import { ADD_MOVIE, SET_FILTER } from '../actions';

const listMovies= [
    {Title: 'The Ring', genre},
    {Title: },
    {..},
    {},
    {},
    {},
];

const movies =(state=listMovies, action)=>{
    switch(action.type){
        case ADD_MOVIE:
            return [...state, action.payload];
            default:
                return state;

    }

}

const allReducers= combineReducers({
    counter: counterReducer,
    logged: loggedReducer
});

export default allReducers;