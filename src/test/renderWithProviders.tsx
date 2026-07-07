import { render, type RenderOptions } from '@testing-library/react'
import { MemoryRouter, Route, Routes, type MemoryRouterProps } from 'react-router-dom'
import type { ReactElement } from 'react'
import { GlobalToast } from '../components/GlobalToast'
import { PlantProvider } from '../context/PlantContext'
import { ToastProvider } from '../context/ToastContext'
import { AddPlantPage } from '../pages/AddPlantPage'
import { HomePage } from '../pages/HomePage'
import { EditPlantPage } from '../pages/EditPlantPage'
import { PlantDetailPage } from '../pages/PlantDetailPage'

type RenderWithProvidersOptions = RenderOptions & {
  route?: string
  routerProps?: MemoryRouterProps
}

const AppRoutes = () => (
  <>
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/add" element={<AddPlantPage />} />
      <Route path="/plants/:plantId" element={<PlantDetailPage />} />
      <Route path="/plants/:plantId/edit" element={<EditPlantPage />} />
    </Routes>
    <GlobalToast />
  </>
)

export const renderWithProviders = (
  ui: ReactElement,
  { route = '/', routerProps, ...options }: RenderWithProvidersOptions = {},
) =>
  render(
    <MemoryRouter initialEntries={[route]} {...routerProps}>
      <PlantProvider>
        <ToastProvider>{ui}</ToastProvider>
      </PlantProvider>
    </MemoryRouter>,
    options,
  )

export const renderApp = (
  route = '/',
  options?: Omit<RenderWithProvidersOptions, 'route'>,
) =>
  renderWithProviders(<AppRoutes />, { route, ...options })
