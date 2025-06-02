import { apiSlice } from "./apiSlice";
import { CATEGORY_URL } from "../constant";

export const categoryApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        createCategory: builder.mutation({
            query: (newCategory) => ({
                url: `${CATEGORY_URL}`,
                method: 'POST',
                body: newCategory,
            }),
        }),

        updateCategory: builder.mutation({
            query: ({ categoryId, updateCategoty }) => ({
                url: `${CATEGORY_URL}/${categoryId},
                method: 'PUT`,
                body: updateCategoty
            }),
        }),

        deleteCategory: builder.mutation({
            query: (categoryId) => ({
                url: `${CATEGORY_URL}/${categoryId}`,
                method: 'DELETE'
            }),
        }),

        fetcHCategory: builder.query({
            query: () => `${CATEGORY_URL}/categories`,

        })
    })
})

export const { useCreateCategoryMutation, useUpdateCategoryMutation, useFetcHCategoryQuery, useDeleteCategoryMutation } = categoryApiSlice