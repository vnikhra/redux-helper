import {createStore, applyMiddleware} from 'redux';
import {create247LoggerObject, getCurrentStateList} from "./redux-helper-utils";
import {List, Map} from "immutable";

export function createStoreWithLogger(appName, reducer, enhancers ,excludedEvents){
    let enhancerArray = enhancers;
    if(!enhancers){
        enhancerArray = [];
    }
    enhancerArray.push(create247LoggerObject(appName, excludedEvents));
    return createStore(reducer, applyMiddleware(...enhancerArray));
}

export function getStateList(){
    let stateArray = getCurrentStateList();
    let stateList = new List();
    stateArray.forEach((state)=>{
        stateList = stateList.push(Map(JSON.parse(state).nextState))
    })
    return stateList;
}