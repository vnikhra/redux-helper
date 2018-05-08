import {createLogger} from "redux-logger"
import {List} from "immutable";

let stateList = List();

export function create247LoggerObject(appName, excludedEvents){
    let currentMessage = {};
    return createLogger({
        logger: {
            log: (messageHead, messageColor, messageObject) => {
                if (messageObject) {
                    if (messageHead.includes("prev state")) {
                        currentMessage.prevState = messageObject;
                    } else if (messageHead.includes("action")) {
                        currentMessage.action = messageObject;
                    } else if (messageHead.includes("next state")) {
                        currentMessage.nextState = messageObject;
                        stateList = stateList.push(messageObject);
                    } else if (messageHead.includes("error")) {
                        currentMessage.error = {
                            message: messageObject.message,
                            stack: messageObject.stack
                        }
                    }
                }else if(messageHead.includes("action")){
                    currentMessage.appName = appName;
                }
                if(messageHead === "—— log end ——"){
                    console.log(JSON.stringify(currentMessage));
                    currentMessage = {};
                }
            }
        },
        predicate: (getState, action) => {
            return !(excludedEvents)
                || !excludedEvents.includes(action.type)
        }
    });
}

export function getCurrentStateList(){
    return stateList;
}