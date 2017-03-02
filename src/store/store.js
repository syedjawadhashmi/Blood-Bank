/**
 * Created by Admin on 12/28/2016.
 */


import { applyMiddleware, compose, createStore } from 'redux';
import thunk from 'redux-thunk';
import reducers from '../reducers';
import epics from '../epics';
import * as donarEpics from '../epics/donar/donar';
import * as patientEpics from '../epics/patientArea/patientArea';
import * as authEpics from '../epics/auth/auth';
import { createEpicMiddleware } from 'redux-observable';
import { combineEpics } from 'redux-observable';
export default (initialState = {}) => {
   


    // if (process.env.NODE_ENV !== 'production.') {
    //     // configure redux-devtools-extension
    //     // @see https://github.com/zalmoxisus/redux-devtools-extension
    //     const devToolsExtension = window.devToolsExtension;
    //     if (typeof devToolsExtension === 'function') {
    //         middleware = compose(middleware, devToolsExtension());
    //     }
    // }



    const pingEpic = action$ =>
        action$.ofType('ping')
            .delay(1000) // Asynchronously wait 1000ms then continue
            .mapTo({ type: 'PONG' });

    const pingEpic2 = action$ =>
        action$.ofType('ping')
            .delay(1000) // Asynchronously wait 1000ms then continue
            .mapTo({ type: 'PONG' });

     const rootEpic = combineEpics(

         pingEpic2,
         patientEpics.getpatientEpics,
         donarEpics.getdonarEpics,
         donarEpics.updatedonarEpics,
         donarEpics.canceldonarEpics,
         authEpics.registerEpic,
         authEpics.loginEpic,
         authEpics.logoutEpic

    );



   const epicMiddleware = createEpicMiddleware(rootEpic);
    let   middleware = applyMiddleware(epicMiddleware);
    const store = createStore(reducers,
        applyMiddleware(epicMiddleware)
    );


    return store;
};
