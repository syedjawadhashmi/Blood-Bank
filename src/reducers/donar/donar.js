import {
    GET_donar_PROCESS_ERROR,
    GET_donar_PROCESS_SUCCESS ,
    GET_donar_PROCESS,
    UPDATE_donar_PROCESS,
    UPDATE_donar_PROCESS_SUCCESS,


} from '../../action/donar/action-types';


const InitalState = {
    isloaded:false,
    isProcessing:false,
    donarData: null
};

export const boookingReducer = function (state = InitalState, action) {

    switch (action.type) {

        case GET_donar_PROCESS:
            return Object.assign({}, state, { isProcessing: true });
        case GET_donar_PROCESS_SUCCESS:
            return Object.assign({}, state, { isloaded: true, donarData: action.payload });
        case UPDATE_donar_PROCESS:
            return Object.assign({}, state, { isProcessing: true });
        case UPDATE_donar_PROCESS_SUCCESS:
            return Object.assign({}, state, { isloaded: true, patientData: action.payload });

        default:
            return state;
    }
}

