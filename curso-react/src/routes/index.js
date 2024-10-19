import { createBrowserRouter } from 'react-router-dom'
import Customer from '../pages/Customer'
import Orders from '../pages/Orders'
import CustomerEdit from '../pages/Customer/edit'
import Login from '../pages/auth/Login'
export const router = createBrowserRouter([
    { 'path': '/login', Component: Login },
    { 'path': '/', Component: Orders },
    { 'path': '/customers', Component: Customer },
    { 'path': '/customers/:id', Component: CustomerEdit },
])