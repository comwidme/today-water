import { Navigate, Route, Routes } from 'react-router-dom'
import { GlobalToast } from './components/GlobalToast'
import { PlantProvider } from './context/PlantContext'
import { ToastProvider } from './context/ToastContext'
import { AddPlantPage } from './pages/AddPlantPage'
import { HomePage } from './pages/HomePage'
import { EditPlantPage } from './pages/EditPlantPage'
import { PlantDetailPage } from './pages/PlantDetailPage'

function App() {
  return (
    <PlantProvider>
      <ToastProvider>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/add" element={<AddPlantPage />} />
          <Route path="/plants/:plantId" element={<PlantDetailPage />} />
          <Route path="/plants/:plantId/edit" element={<EditPlantPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
        <GlobalToast />
      </ToastProvider>
    </PlantProvider>
  )
}

export default App
