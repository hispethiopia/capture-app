// @flow
import { convertToClientTeis } from './convertToClientTeis';
import { getSubvalues, getApiFilterQueryArgs, getMainApiFilterQueryArgs } from '../getListDataCommon';
import type { RawQueryArgs } from './types';
import type { InputMeta } from './getTeiListData.types';
import type { TeiColumnsMetaForDataFetching, TeiFiltersOnlyMetaForDataFetching } from '../../../../types';

const createApiQueryArgs = ({
    page,
    pageSize,
    programId: program,
    orgUnitId: orgUnit,
    filters,
    sortById,
    sortByDirection,
}: RawQueryArgs,
columnsMetaForDataFetching: TeiColumnsMetaForDataFetching,
filtersOnlyMetaForDataFetching: TeiFiltersOnlyMetaForDataFetching,
): { [string]: any } => ({
    ...getApiFilterQueryArgs(filters, filtersOnlyMetaForDataFetching),
    ...getMainApiFilterQueryArgs(filters, filtersOnlyMetaForDataFetching),
    order: `${sortById}:${sortByDirection}`,
    page,
    pageSize,
    orgUnit,
    ouMode: orgUnit ? 'SELECTED' : 'ACCESSIBLE',
    program,
    fields: ':all,programOwners[orgUnit,program]',
});

export const getTeiListData = async (
    rawQueryArgs: RawQueryArgs, {
        columnsMetaForDataFetching,
        filtersOnlyMetaForDataFetching,
        querySingleResource,
        absoluteApiPath,
    }: InputMeta,
) => {
    const { resource, queryArgs } = {
        resource: 'tracker/trackedEntities',
        queryArgs: createApiQueryArgs(rawQueryArgs, columnsMetaForDataFetching, filtersOnlyMetaForDataFetching),
    };

    const { instances: apiTeis = [] } = await querySingleResource({
        resource,
        params: queryArgs,
    });
    const columnsMetaForDataFetchingArray = [...columnsMetaForDataFetching.values()];
    const clientTeis = convertToClientTeis(apiTeis, columnsMetaForDataFetchingArray, rawQueryArgs.programId);
    const clientTeisWithSubvalues = await getSubvalues(querySingleResource, absoluteApiPath)(clientTeis, columnsMetaForDataFetchingArray);

    return {
        recordContainers: clientTeisWithSubvalues,
        request: {
            resource,
            queryArgs,
        },
    };
};
