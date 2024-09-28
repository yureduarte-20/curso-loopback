import { useEffect, useState } from "react"
import api from "../../service/api"
import { Link } from 'react-router-dom'

export default function Orders() {
    const [orders, setOrders] = useState([])

    async function fetchOrders() {
        const response = await api.get(`/orders?filter=${JSON.stringify({ include:['customer', 'product'] })}`)
        setOrders(response.data)
    }

    useEffect(() => {
        fetchOrders()
    }, [])

    return (
        <>
            <h1>Página de Pedidos</h1>
            <Link to={'/customers'}>Clientes</Link>
            <ul>
                {orders.map(item => <li key={item.id}> Produto: {item.product.name} - Quantidade: {item.quantity} - Consumidor: {item.customer.name} </li>  )}
            </ul>
        </>
    )
}