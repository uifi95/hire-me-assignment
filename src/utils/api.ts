import { ChildrenResponse } from '../types/api';
import { mapChildRawToChild } from './child';

const ACCESS_TOKEN = import.meta.env.VITE_ACCESS_TOKEN;

const endpointUrl = <T extends Record<string, string>>(
    path: `/${string}`,
    queryParams?: T
) => {
    const baseUrl = `${import.meta.env.VITE_API_URL}${path}`;
    const urlQueryParams = new URLSearchParams(queryParams);

    if (urlQueryParams.size > 0) {
        return `${baseUrl}?${urlQueryParams.toString()}`;
    }

    return baseUrl;
};

const authorizedEndpointUrl = <T extends Record<string, string>>(
    path: `/${string}`,
    queryParams?: T
) => endpointUrl(path, { accessToken: ACCESS_TOKEN, ...queryParams });

const authorizedFormBody = (params: Record<string, string> = {}) =>
    new URLSearchParams({ accessToken: ACCESS_TOKEN, ...params });

const fetchJson = async <T = void>(
    input: RequestInfo | URL,
    init?: RequestInit
): Promise<T> => {
    const response = await fetch(input, init);
    return (await response.json()) as T;
};

export const getChildrenAPI = async () => {
    const { children } = await fetchJson<ChildrenResponse>(
        authorizedEndpointUrl('/daycare/tablet/group', {
            groupId: '86413ecf-01a1-44da-ba73-1aeda212a196',
            institutionId: 'dc4bd858-9e9c-4df7-9386-0d91e42280eb',
        })
    );
    return children.map(mapChildRawToChild);
};

export const checkInChildAPI = async (childId: string, pickupTime: Date) => {
    pickupTime = new Date(pickupTime);
    pickupTime.setHours(pickupTime.getHours() + 1, pickupTime.getMinutes());

    return fetchJson(endpointUrl(`/v2/children/${childId}/checkins`), {
        method: 'POST',
        body: authorizedFormBody({
            pickupTime: `${pickupTime.getUTCHours()}:${pickupTime.getUTCMinutes()}`,
        }),
    });
};

export const checkOutChildAPI = async (childId: string) => {
    return fetchJson(endpointUrl(`/v2/children/${childId}/checkout`), {
        method: 'POST',
        body: authorizedFormBody(),
    });
};
