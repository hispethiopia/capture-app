// @flow

import { actionCreator } from 'd2-tracker/actions/actions.utils';

export const actionTypes = {
    STARTUP_DATA_LOAD: 'StartupDataLoad',
    STARTUP_DATA_LOADED: 'StartupDataLoaded',
};

export const startupDataLoad = () => actionCreator(actionTypes.STARTUP_DATA_LOAD)();
export const startupDataLoaded = payload => actionCreator(actionTypes.STARTUP_DATA_LOADED)(payload);
