/**
 * Created by S jawwad hashmi on 1/27/2017.
 */

import { Observable } from "rxjs";

import { ActionsObservable } from "redux-observable";

import { browserHistory } from 'react-router'; // http://stackoverflow.com/questions/31079081/programmatically-navigate-using-react-router


import {
    GET_patient_PROCESS,
    GET_patient_PROCESS_SUCCESS,
    GET_patient_PROCESS_ERROR,

} from '../../action/patient';

import firebase from 'firebase';
import { firebaseDb } from '../../config/firebase';




export const getpatientEpics = action$ =>
    action$.ofType(GET_patient_PROCESS)
        .switchMap(() => {
            return Observable.fromPromise(firebaseDb.ref('/').child(`patientareas`).once('value'))

                .map(u => {
                    return {
                        type: GET_patient_PROCESS_SUCCESS,
                        payload: u.val()

                    }

            });

        })

