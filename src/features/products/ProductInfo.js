import React from 'react'
import { useNavigate, useParams } from 'react-router'
import { useGetProductsQuery } from '../api/productsApi'

const ProductInfo = () => {
  const navigate = useNavigate()
  const { id } = useParams()
  const { data: products, error, isLoading } = useGetProductsQuery()

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

  const product = products.find((item) => item.id === +id)
  const { title, price, description, category, image, rating } = product
  console.log('product', product)

  return (
    <div>
      <button onClick={handleBackButtonClick}>Back</button>
      <h1>{title}</h1>
      <h2>Category: {category}</h2>
      <h2>Price: {price}</h2>
      <p>
        Rating: {rating.rate} {rating.count}
      </p>
      <p>{description}</p>
      <img alt={title} src={image} />
    </div>
  )
}

export default ProductInfo
