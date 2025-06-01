import { fetchBaseQuery, createApi } from "@reduxjs/toolkit/query/react";
import { BASE_URL } from '../constant';

const baseQuery = fetchBaseQuery({
    baseUrl: BASE_URL,
    credentials: 'include', // if you want cookies to
});

export const apiSlice = createApi({
    reducerPath: 'api',
    baseQuery,
    tagTypes: ['Product', 'Order', 'User', 'Category'],
    endpoints: (builder) => ({}),
});
