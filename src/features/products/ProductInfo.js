import React from 'react'
import { useNavigate, useParams } from 'react-router'
import { useGetProductQuery } from '../api/productsApi'

const ProductInfo = () => {
  const navigate = useNavigate()
  const { id } = useParams()
  const { data: product, error, isLoading } = useGetProductQuery(id)

  const handleBackButtonClick = () => {
    navigate('..', { relative: 'path' })
  }

  if (isLoading) return <h1>Loading...</h1>
  if (error)
    return (
      <p>
        Error: {error.status} {error.error}
      </p>
    )

  return (
    <div>
      <button onClick={handleBackButtonClick}>Back</button>
      <h1>ProductInfo</h1>
      <h2>{product.title}</h2>
      <img alt={product.title} src={product.image} />
    </div>
  )
}

export default ProductInfo
