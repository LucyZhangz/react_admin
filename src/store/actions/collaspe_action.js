import { HANDLECOLLAPSE } from "../constant";

export const createCollapseAction = (data) => {
    return {
        type: HANDLECOLLAPSE,
        data,
    }
}