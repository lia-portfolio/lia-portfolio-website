import { createHashRouter, RouterProvider, Outlet } from 'react-router-dom'
import { ThemeProvider } from './context/ThemeContext'
import { Layout } from './components/layout/Layout'
import { Hero } from './components/sections/Hero'
import { AboutMe } from './components/sections/AboutMe'
import { Paintings } from './components/sections/Paintings'
import { OtherWork } from './components/sections/OtherWork'
import { Contact } from './components/sections/Contact'
import { AdminRoute } from './admin/AdminRoute'

const router = createHashRouter([
  {
    path: '/',
    element: (
      <Layout>
        <Outlet />
      </Layout>
    ),
    children: [
      {
        index: true,
        element: (
          <>
            <Hero />
            <AboutMe />
            <Paintings />
            <OtherWork />
            <Contact />
          </>
        ),
      },
    ],
  },
  {
    path: '/admin',
    element: <AdminRoute />,
  },
])

export function App() {
  return (
    <ThemeProvider>
      <RouterProvider router={router} />
    </ThemeProvider>
  )
}
