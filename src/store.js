// @flow
import { createStore, applyMiddleware, combineReducers } from 'redux';
import { createEpicMiddleware } from 'redux-observable';
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly';
import {createLogger} from 'redux-logger';

import { buildReducersFromDescriptions } from 'd2-tracker/tracker-redux/trackerReducer';
import environments from 'd2-tracker/constants/environments';

import reducerDescriptions from './reducerDescriptions/trackerCapture.reducerDescriptions';
import epics from './epics/trackerCapture.epics';

const middleWares = [createEpicMiddleware(epics)];

if (process.env.NODE_ENV !== environments.prod) {
    middleWares.push(
        createLogger({ }),
    );
} 

const reducersFromDescriptions = buildReducersFromDescriptions(reducerDescriptions);

const rootReducer = combineReducers({ ...reducersFromDescriptions });

export default createStore(rootReducer, composeWithDevTools(applyMiddleware(...middleWares)));
