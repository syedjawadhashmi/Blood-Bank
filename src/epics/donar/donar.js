/**
 * Created by S jawwad hashmi on 1/28/2017.
 */
/**
 * Created by S jawwad hashmi on 1/27/2017.
 */

import { Observable } from "rxjs";

import { ActionsObservable } from "redux-observable";

import { browserHistory } from 'react-router'; // http://stackoverflow.com/questions/31079081/programmatically-navigate-using-react-router


import {
    GET_donar_PROCESS,
    GET_donar_PROCESS_SUCCESS,
    CANCEL_donar_PROCESS,
    UPDATE_donar_PROCESS,
    UPDATE_donar_PROCESS_SUCCESS
} from '../../action/donar';

import firebase from 'firebase';
import { firebaseDb } from '../../config/firebase';




export const getdonarEpics = action$ =>
    action$.ofType(GET_donar_PROCESS)
        .switchMap(({payload}) => {
            return Observable.fromPromise(firebaseDb.ref('/').child(`patientareas`).child(payload).once('value'))

                .map(u => {
                    return {
                        type: GET_donar_PROCESS_SUCCESS,
                        payload: u.val()

                    }

                });

        })
export const canceldonarEpics = action$ =>
    action$.ofType(CANCEL_donar_PROCESS)
        .switchMap(({payload}) => {

            const data={

                bookedbyName:' ',
                donar:false,
                bookedby:'',
                startingTime:'',
                startingDate:'',
                endingTime:'',


            }
            return firebaseDb.ref('/').child(`slots`).child(payload.slotid).child('111111').update(data)

                .then(d => {
                    return {
                        type: GET_donar_PROCESS,
                        payload:payload.slotid
                    };
                })


        })
export const updatedonarEpics = action$ =>
    action$.ofType(UPDATE_donar_PROCESS)
        .switchMap(({payload}) => {


            const data={

                name:payload.name,
                lastName:payload.lastName,
                phoneNo:payload.phoneNo,
                booked:true,
                bookedby:payload.name,
                bloodgroup:"Blood Group "+payload.bloodgroup,
                startingDate:payload.startDate,
                url:"https://static1.squarespace.com/static/56eddde762cd9413e151ac92/t/570cb8905bd33022b93a1b87/1460466548966/bloddonation.gif",


            }

            return firebaseDb.ref('/').child(`patientareas`).push(data)
                .then(d => {

                    return {
                        type: GET_patient_PROCESS,
                        payload:payload.slotid
                    };
                })


        })