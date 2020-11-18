import departmentReducer from './reducer/Department';
import { createStore, combineReducers } from 'redux';

const config = {
    status: [
        { label: '禁用', value: false },
        { label: '启用', value: true }
    ]
}

const configReducer = (state = config, action) => {
    return state;
}



const allReducer = {
    config: configReducer,
    department: departmentReducer
}

const combine = combineReducers(allReducer)
const store = createStore(combine);

export default store;