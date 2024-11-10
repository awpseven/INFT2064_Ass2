import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import Dashboard from '../views/dashboard'
import Login from './../views/login'
import Register from '../views/register'
import { Layout } from '../components/layout'
const Routes = () => {
  const router = createBrowserRouter([
    {
      path: '/',

      element: <Layout />,
      children: [
        {
          path: '/',
          element: <Dashboard />,
        },
      ],
    },
    {
      path: '/login',
      element: <Login />,
    },
    {
      path: '/register',
      element: <Register />,
    },
  ])

  // Provide the router configuration using RouterProvider
  return <RouterProvider router={router} />
}

export default Routes
