import React, { useState } from 'react'
import { productsApi } from '../api/productsApi'
import { useDispatch } from 'react-redux'

const CreateProduct = () => {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [category, setCategory] = useState("Women's clothing")
  const [price, setPrice] = useState('')
  const [notice, setNotice] = useState('')

  const dispatch = useDispatch()

  function findMaxId(arr) {
    if (arr.length === 0) return null;
    return arr.reduce((max, obj) => obj.id > max ? obj.id : max, arr[0].id);
  }

  const handleAddProduct = () => {
    if (title && description && price) {
      dispatch(
        productsApi.util.updateQueryData('getProducts', undefined, (draft) => {
          draft.unshift({
            id: findMaxId(draft) + 1,
            title,
            price,
            description,
            category,
            image: 'https://lipsum.app/random/600x400',
            rating: { count: 0, rate: 0 },
            isFavorite: false,
          })
        }),
      )
      setTitle('')
      setDescription('')
      setPrice('')
      setNotice('You create a new product!')
    } else {
      setNotice('You must fill all inputs!')
    }
  }

  const handleChange = (e) => {
    const value = e.target.value
    setPrice(Number(value))
  }

  return (
    <>
      <h1>CreateProduct</h1>
      <div>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Title"
        />
        <input
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Description"
        />
      </div>
      <div>
        <span>Category</span>
        <select onChange={(e) => setCategory(e.target.value)}>
          <option value="Women's clothing">Women's clothing</option>
          <option value="Men's clothing">Men's clothing</option>
          <option value="Jewelry">Jewelry</option>
          <option value="Electronics">Electronics</option>
        </select>
      </div>
      <div>
        <input
          type="number"
          value={price}
          onChange={handleChange}
          placeholder="Price"
        />
      </div>
      <button type="submit" onClick={handleAddProduct}>
        Add Product
      </button>
      <div>{notice}</div>
    </>
  )
}

export default CreateProduct
