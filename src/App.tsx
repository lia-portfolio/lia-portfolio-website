import { createHashRouter, RouterProvider, Outlet, useRouteError } from 'react-router-dom'
import { Component, type ReactNode } from 'react'
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
      <a href="/lia-portfolio-website/">Volver al inicio</a>
    </div>
  )
}

interface ErrorBoundaryState { hasError: boolean; message: string }

export class ErrorBoundary extends Component<{ children: ReactNode }, ErrorBoundaryState> {
  state: ErrorBoundaryState = { hasError: false, message: '' }

  static getDerivedStateFromError(error: unknown): ErrorBoundaryState {
    const message = error instanceof Error ? error.message : 'Error inesperado.'
    return { hasError: true, message }
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{ padding: '2rem', fontFamily: 'sans-serif', textAlign: 'center' }}>
          <p style={{ color: '#c0392b', marginBottom: '1rem' }}>{this.state.message}</p>
          <button onClick={() => this.setState({ hasError: false, message: '' })}>
            Reintentar
          </button>
        </div>
      )
    }
    return this.props.children
  }
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
