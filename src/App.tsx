import { createHashRouter, RouterProvider, Outlet, useRouteError } from 'react-router-dom'
import { ThemeProvider } from './context/ThemeContext'
import { Layout } from './components/layout/Layout'
import { Hero } from './components/sections/Hero'
import { AboutMe } from './components/sections/AboutMe'
import { Paintings } from './components/sections/Paintings'
import { OtherWork } from './components/sections/OtherWork'
import { Contact } from './components/sections/Contact'
import { AdminRoute } from './admin/AdminRoute'

function RouteError() {
  const error = useRouteError() as { message?: string } | undefined
  return (
    <div style={{ padding: '2rem', fontFamily: 'sans-serif', textAlign: 'center' }}>
      <h1>Algo ha ido mal</h1>
      <p>{error?.message ?? 'Ha ocurrido un error inesperado.'}</p>
      <a href="/">Volver al inicio</a>
    </div>
  )
}

const router = createHashRouter([
  {
    path: '/',
    element: (
      <Layout>
        <Outlet />
      </Layout>
    ),
    errorElement: <RouteError />,
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
    errorElement: <RouteError />,
  },
])

export function App() {
  return (
    <ThemeProvider>
      <RouterProvider router={router} />
    </ThemeProvider>
  )
}
