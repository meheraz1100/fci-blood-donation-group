import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import {
  RouterProvider,
} from "react-router-dom";
import { router } from './Routes/Router.jsx';
import { HelmetProvider } from 'react-helmet-async';
import AuthProviders from './Providers/AuthProviders.jsx';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {
  QueryClient,
  QueryClientProvider
} from '@tanstack/react-query'
const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProviders>
    <QueryClientProvider client={queryClient}>
      <HelmetProvider>
        <div className='max-w-screen-xl mx-auto'>
          <RouterProvider router={router} />
          <ToastContainer />
        </div>
      </HelmetProvider>
    </QueryClientProvider>
    </AuthProviders>
  </React.StrictMode>,
)
