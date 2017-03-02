/**
 * Created by S jawwad hashmi on 1/27/2017.
 */
import {
    GET_Donar_PROCESS,
    UPDATE_Donar_PROCESS,
    CANCEL_Donar_PROCESS,
    ADD_FEEDBACK
} from './action-types';

export function getDonarSlots(data) {
    return {
        type: GET_Donar_PROCESS,
        payload:data
    };
}

export function updateDonarSlots(data) {
    return {
        type: UPDATE_Donar_PROCESS,
        payload:data
    };
}
export function cancelDonarSlots(data) {
    return {
        type: CANCEL_Donar_PROCESS,
        payload:data
    };
}

export function addFeedBack(data) {
    return {
        type: ADD_FEEDBACK,
        payload:data
    };
}