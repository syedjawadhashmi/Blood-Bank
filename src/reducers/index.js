/**
 * Created by Admin on 12/28/2016.
 */
import { routerReducer } from 'react-router-redux';
import { combineReducers } from 'redux';
import { authReducer} from './auth/auth';
import { patientReducer } from './patientAreas/patientAreas';
import { boookingReducer } from './donar/donar';

export default combineReducers({
    routing: routerReducer,
    auth: authReducer,
    patientData:patientReducer,
    donarData:boookingReducer

});


