import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import NotFound from './pages/NotFound'
import Bin from './pages/Bin'
import Layout from './pages/Layout'
import axios from 'axios'
import { Toaster } from 'react-hot-toast'
import Shared from './pages/Shared'
import Reminders from './pages/Reminders'
import useReminder from './hooks/useReminder'
import ImageUploader from './pages/ImageUploader'

axios.defaults.baseURL = "http://localhost:8080/"

function App() {
  useReminder()

  return (
    <>
      <Toaster
        position='top-center'
        toastOptions={{
          style: {
            borderRadius: '10px',
            background: '#2b3440',
            color: '#ffffff',
          },
        }}
      />
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route index element={<Home />} />
          <Route path='/bin' element={<Bin />} />
          <Route path='/shared/:noteId' element={<Shared />} />
          <Route path='/reminders' element={<Reminders />} />
          <Route path='/ImageUploader' element={<ImageUploader />} />
        </Route>
        <Route path='*' element={<NotFound />} />
      </Routes>
      

    </>
  )
}

export default App
