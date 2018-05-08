import {createStore, applyMiddleware} from 'redux';
import {create247LoggerObject, getCurrentStateList} from "./redux-helper-utils";

export function createStoreWithLogger(appName, reducer, enhancers ,excludedEvents){
    let enhancerArray = enhancers;
    if(!enhancers){
        enhancerArray = [];
    }
    enhancerArray.push(create247LoggerObject(appName, excludedEvents));
    return createStore(reducer, applyMiddleware(...enhancerArray));
}

export function getStateList(){
    return getCurrentStateList();
}