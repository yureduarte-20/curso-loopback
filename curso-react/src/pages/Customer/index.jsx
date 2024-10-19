import { useEffect, useState } from "react"
import { isAxiosError } from 'axios'
import { Link } from "react-router-dom"
import { useApi } from "../../service/api"

export default function Customer() {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const api = useApi()
    const [customers, setCustomers] = useState([])

    async function createCustomer() {
        try {
            await api.post('/customers', { name, email })
            alert('criado com sucesso!')
            fetchCustomers()
        } catch (e) {
            if(isAxiosError(e)){
                if(e.response){
                    alert(e.response.data.error.message)
                }
            }
        }
    }
    async function deleteCustomer(id) {

        await api.delete(`/customers/${id}`)
        fetchCustomers()
    }
    async function fetchCustomers() {
        const response = await api.get('/customers');
        setCustomers(response.data)
    }
    useEffect(() => {
        fetchCustomers()
    }, [])
    return (
        <>
            <h1>Página de Clientes</h1>
            <div>
                <div style={{ marginBottom: 20 }}>
                    <label htmlFor="name">Nome</label>
                    <input name="name" value={name} onChange={e => setName(e.target.value)} />
                </div>
                <div>
                    <label htmlFor="Email">Email</label>
                    <input name="email" value={email} onChange={e => setEmail(e.target.value)} />
                </div>
                <button onClick={createCustomer} >Criar</button>
            </div>
            <div>
                <ul>
                    { customers.map(customer => <li key={customer.id}> 
                        {customer.name} - {customer.email} 
                        <Link to={`/customers/${customer.id}`}>Editar</Link>
                        <button onClick={() => deleteCustomer(customer.id)}>Apagar</button>
                        </li>) }
                </ul>
            </div>
        </>
    )
}