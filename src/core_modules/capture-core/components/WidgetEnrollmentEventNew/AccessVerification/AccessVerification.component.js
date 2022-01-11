// @flow
import React from 'react';
import { Validated } from '../Validated';
import { NoAccess } from './NoAccess.component';
import type { Props } from './accessVerification.types';

export const AccessVerificationComponent = ({ eventAccess, onCancel, widgetReducerName, ...passOnProps }: Props) => {
    if (!eventAccess.write) {
        return (
            <NoAccess
                onCancel={onCancel}
            />
        );
    }

    return (
        // $FlowFixMe
        <Validated
            {...passOnProps}
            onCancel={onCancel}
        />
    );
};
