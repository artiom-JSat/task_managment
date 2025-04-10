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
    deleteProduct: create.mutation({
      query: (id) => ({ url: `/products/${id}`, method: 'DELETE' }),
      invalidatesTags: [{ type: 'Products', id: 'LIST' }],
    }),
    addProduct: create.mutation({
      query: (product) => ({
        url: '/products',
        method: 'POST',
        body: product,
      }),
      invalidatesTags: ['Products'],
    }),
  }),
})

export const {
  useGetProductsQuery,
  useGetProductQuery,
  useDeleteProductMutation,
  useAddProductMutation,
} = productsApi
