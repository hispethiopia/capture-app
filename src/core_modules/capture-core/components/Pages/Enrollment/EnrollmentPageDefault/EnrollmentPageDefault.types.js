// @flow
import { typeof effectActions } from '@dhis2/rules-engine-javascript';
import type { Program } from 'capture-core/metaData';
import type { Stage } from 'capture-core/components/WidgetStagesAndEvents/types/common.types';
import type { WidgetEffects, HideWidgets } from '../../common/EnrollmentOverviewDomain';
import type { Event } from '../../common/EnrollmentOverviewDomain/useCommonEnrollmentDomainData';

export type Props = {|
    program: Program,
    enrollmentId: string,
    teiId: string,
    events: ?Array<Event>,
    stages?: Array<Stage>,
    widgetEffects: ?WidgetEffects,
    hideWidgets: HideWidgets,
    orgUnitId: string,
    onDelete: () => void,
    onAddNew: () =>void,
    onViewAll: (stageId: string) => void,
    onCreateNew: (stageId: string) => void,
    onEventClick: (eventId: string) => void,
    onUpdateTeiAttributeValues: (attributes: Array<{ [key: string]: string }>, teiDisplayName: string) => void,
    onUpdateEnrollmentDate: (enrollmentDate: string) => void,
    onUpdateIncidentDate: (incidentDate: string) => void,
    onEnrollmentError: (message: string) => void,
    ruleEffects?: Array<{id: string, type: $Values<effectActions>}>;
|};

export type PlainProps = {|
    ...Props,
    ...CssClasses,
|};
