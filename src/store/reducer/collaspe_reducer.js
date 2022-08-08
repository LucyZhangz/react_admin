import { HANDLECOLLAPSE } from "../constant";
const collapse = false;

export default function CollapseReducer(preState = collapse,action){
    const {type ,data}  = action;
    switch (type) {
        case HANDLECOLLAPSE:
            return !preState
        default:
           return  preState;
    }
}