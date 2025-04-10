import React from 'react'
import { productsApi, useGetProductsQuery } from '../api/productsApi'
import ProductListItem from './ProductListItem'
import { useDispatch } from 'react-redux'
const ProductsList = () => {
  const { data: products, error, isLoading } = useGetProductsQuery()
  const dispatch = useDispatch()

  const handleDeleteCharacter = (id) => {
    dispatch(
      productsApi.util.updateQueryData(
        'getProducts',
        undefined,
        (draft) => {
          return draft.filter((product) => product.id !== id)
        },
      ),
    )
  }

  if (isLoading) return <h1>Loading...</h1>
  if (error)
    return (
      <p>
        Error: {error.status} {error.error}
      </p>
    )

  console.log('products', products)

  return (
    <>
      <h1>Products</h1>
      {products.map((product) => (
        <div key={product.id}>
          <ProductListItem product={product} />
          <button onClick={() => handleDeleteCharacter(product.id)}>
            Delete
          </button>
        </div>
      ))}
    </>
  )
}

export default ProductsList
