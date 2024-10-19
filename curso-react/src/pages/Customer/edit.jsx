import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useApi } from '../../service/api'

export default function CustomerEdit() {
    const { id } = useParams()
    const [email, setEmail] = useState('')
    const [name, setName] = useState('')
    const api = useApi() 
    async function fetchCustomer() {
        const response = await api.get('customers/' + id)
        const { email, name } = response.data;
        setEmail(email)
        setName(name)
    }
    async function update() 
    {
        try {
            await api.patch('/customers/' + id, { name, email })
            alert('criado com sucesso!')
            fetchCustomer()
        } catch (e) {
            if(isAxiosError(e)){
                if(e.response){
                    alert(e.response.data.error.message)
                }
            }
        }
    }
    useEffect(() => {
        fetchCustomer()
    }, [])
    return (
        <>
            <h1>Página de edição de Clientes</h1>
            <div>
                <div style={{ marginBottom: 20 }}>
                    <label htmlFor="name">Nome</label>
                    <input name="name" value={name} onChange={e => setName(e.target.value)} />
                </div>
                <div>
                    <label htmlFor="Email">Email</label>
                    <input name="email" value={email} onChange={e => setEmail(e.target.value)} />
                </div>
                <button onClick={update} >Editar</button>
            </div>
        </>
    )

}