import React from 'react'
import { useGetProductsQuery } from '../api/productsApi'

const ProductsList = () => {
  const { data: products, error, isLoading } = useGetProductsQuery()

  console.log('products', products)

  try {
    
  } catch (error) {
    
  }

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
      {products.map((product) => <div key={product.id}>{product.title}</div>)}
    </>
  )
}

export default ProductsList
