import React from 'react'
import { useGetProductsQuery } from '../api/productsApi'
import ProductListItem from './ProductListItem'

const ProductsList = () => {
  const { data: products, error, isLoading } = useGetProductsQuery()

  if (isLoading) return <h1>Loading...</h1>
  if (error)
    return (
      <p>
        Error: {error.status} {error.error}
      </p>
    )

  return (
    <>
      <h1>Products</h1>
      {products.map((product) => (
        <div key={product.id}>
          <ProductListItem product={product} />
        </div>
      ))}
    </>
  )
}

export default ProductsList
