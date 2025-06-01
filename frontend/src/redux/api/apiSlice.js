import { fetchBaseQuery, createApi } from "@reduxjs/toolkit/query/react";
import { BASE_URL } from '../constant';

const baseQuery = fetchBaseQuery({
    baseUrl: BASE_URL,
    credentials: 'include', // if you want cookies too
    prepareHeaders: (headers, { getState }) => {
        const token = getState().auth.token; // adapt path to where your token is
        if (token) {
            headers.set('Authorization', `Bearer ${token}`);
        }
        return headers;
    },
});

export const apiSlice = createApi({
    reducerPath: 'api',
    baseQuery,
    tagTypes: ['Product', 'Order', 'User', 'Category'],
    endpoints: (builder) => ({}),
});
