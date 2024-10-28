import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import Dashboard from '../views/dashboard'
import Login from './../views/login'
import Register from '../views/register'

const Routes = () => {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <Dashboard />,
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
