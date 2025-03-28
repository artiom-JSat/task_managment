import { baseApi } from './baseApi'

export const productsApi = baseApi.injectEndpoints({
  endpoints: (create) => ({
    getProducts: create.query({
      query: () => '/products',
      transformResponse: (response) => {
        const product = response.map((product) => ({
          ...product,
          isFavorite: false,
        }))
        return product
      },
      providesTags: (result) =>
        result
          ? [
              ...result.map((product) => ({
                type: 'Product',
                id: product.id,
              })),
              { type: 'Product', id: 'LIST' },
            ]
          : [],
    }),
    getProduct: create.query({
      query: (id) => `/products/${id}`,
      providesTags: ['Product'],
    }),
  }),
})

export const { useGetProductsQuery, useGetProductQuery } = productsApi
