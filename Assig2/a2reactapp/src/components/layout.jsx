import { Navigate, Outlet } from 'react-router-dom'
import { useAuth } from '../utils/auth'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Icon } from '@iconify-icon/react'
import Logo from '../assets/images/logo.png'

export const Layout = () => {
  const { passwordHash, logout } = useAuth()
  const navigate = useNavigate()
  useEffect(() => {
    console.log(passwordHash)
    if (passwordHash == null) {
      navigate('/login', { redirect: true })
    }
  }, [passwordHash])

  return (
    <>
      <div className="flex flex-col px-10">
        <div className="flex justify-between items-center">
          <div className="py-4 flex space-x-4 items-center">
            <img className="w-20" src={Logo} alt="logo" />
            <div className="flex flex-col">
              <h1 className="text-3xl font-extrabold">
                MPDC Dashboard for SAPOL
              </h1>
              <p>inft2064 Assignment Demo Website</p>
            </div>
          </div>
          <Icon
            onClick={() => logout(() => navigate('/login', { redirect: true }))}
            className="text-3xl text-red-500"
            icon="material-symbols:logout"
          />
        </div>
        <div className="flex flex-col space-y-4">
          <Outlet />
        </div>
      </div>
    </>
  )
}
