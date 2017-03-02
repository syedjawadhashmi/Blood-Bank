
import {
    GET_patient_PROCESS_ERROR,
 GET_patient_PROCESS_SUCCESS ,
 GET_patient_PROCESS
} from '../../action/patient';


const InitalState = {
    isloaded:false,
    isProcessing:false,
    patientData: null
};

export const patientReducer = function (state = InitalState, action) {

    switch (action.type) {

        case GET_patient_PROCESS:
            return Object.assign({}, state, { isProcessing: true });
        case GET_patient_PROCESS_SUCCESS:
            return Object.assign({}, state, { isloaded: true, patientData: action.payload });



        default:
            return state;
    }
}

