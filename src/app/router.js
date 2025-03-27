import { createBrowserRouter, Link, Outlet, redirect } from 'react-router'
import { store } from './store'
import { productsApi } from '../features/api/productsApi'
import ProductsList from '../features/products/ProductsList'
import ProductInfo from '../features/products/ProductInfo'
import CreateProduct from './../features/products/CreateProduct'

const loadStore = () =>
  new Promise((resolve) => {
    setTimeout(() => resolve(store), 0)
  })

export const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <div className="App">
        <header className="menu">
          <Link to="products">Products</Link>
          <Link to="create-product">Create</Link>
        </header>
        <Outlet />
      </div>
    ),
    children: [
      {
        index: true,
        loader: () => redirect('/products'),
      },
      {
        path: 'products',
        element: <ProductsList />,
        loader: () => {
          loadStore().then(async () => {
            store.dispatch(
              productsApi.util.prefetch('getProducts', undefined, {}),
            )
          })
          return null
        },
      },
      {
        path: 'products/:id',
        element: <ProductInfo />,
        loader: ({ params }) => {
          loadStore().then(async () => {
            store.dispatch(
              productsApi.util.prefetch('getProducts', params.id ?? '', {}),
            )
          })
          return null
        },
      },
      {
        path: 'create-product',
        element: <CreateProduct />,
        loader: () => {
          loadStore().then(async () => {
            store.dispatch(
              productsApi.util.prefetch('getProducts', undefined, {}),
            )
          })
          return null
        },
      },
    ],
  },
])
