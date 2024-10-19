import { useEffect, useState } from "react"
import { Link } from 'react-router-dom'
import { useApi } from "../../service/api"

export default function Orders() {
    const [orders, setOrders] = useState([])
    const api = useApi()
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