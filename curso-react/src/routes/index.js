import { createBrowserRouter } from 'react-router-dom'
import Customer from '../pages/Customer'
import Orders from '../pages/Orders'
import CustomerEdit from '../pages/Customer/edit'
export const router = createBrowserRouter([
    { 'path': '/', Component: Orders },
    { 'path': '/customers', Component: Customer },
    { 'path': '/customers/:id', Component: CustomerEdit },
])