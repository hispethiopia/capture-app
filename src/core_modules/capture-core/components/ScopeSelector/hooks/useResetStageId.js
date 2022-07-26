// @flow
import { useHistory, useLocation } from 'react-router-dom';
import { getUrlQueries } from '../../../utils/url';
import { buildUrlQueryString } from '../../../utils/routing';
import type { PageContext } from './types';

export const useResetStageId = () => {
    const history = useHistory();
    const { pathname } = useLocation();

    const resetStageId = (pageToPush: string = pathname, pageContext?: PageContext) => {
        const { programId, orgUnitId, teiId, enrollmentId = pageContext?.enrollmentId } = getUrlQueries();
        history.push(`${pageToPush}?${buildUrlQueryString({ programId, orgUnitId, teiId, enrollmentId })}`);
    };

    return { resetStageId };
};
