import { useNavigate } from "react-router"

const ProductListItem = ({ product: { id, title, price, rating } }) => {
  const navigate = useNavigate()

  const handleUserClick = () => {
    navigate(`${id}`)
  }
  
  return (
    <div onClick={handleUserClick}>
      <h3>{title}</h3>
      <p>Price: {price}</p>
      <p>Rating: {rating.rate} {rating.count}</p>
    </div>
  )
}

export default ProductListItem
