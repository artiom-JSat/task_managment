import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const baseUrl = 'https://fakestoreapi.com'

export const baseApi = createApi({
  baseQuery: fetchBaseQuery({ baseUrl }),
  tagTypes: ['Products'],
  endpoints: () => ({}),
})
