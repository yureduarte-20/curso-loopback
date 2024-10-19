import { useState } from "react";
import { TOKEN_KEY, useApi } from "../../../service/api";
import { useNavigate } from 'react-router-dom'
export default function Login() {
    const api = useApi()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
        
    const navigate = useNavigate()
    async function handleSubmit(){
        try{
            const {data} = await api.post('/login', { email, password })
            localStorage.setItem(TOKEN_KEY, data.token)
            navigate('/')
        } catch(e){
            alert(e.message)
        }
    }
    return (
        <div>
            <h1>Tela de Login</h1>
            <div>
                <label>Email</label>
                <input value={email} onChange={e => setEmail(e.target.value)} placeholder="Digite seu email"></input>
            </div>
            <div>
                <label>Senha</label>
                <input value={password} onChange={e => setPassword(e.target.value)} placeholder="Digite sua senha" type="password"></input>
            </div>
            <button onClick={handleSubmit} >Enviar</button>
        </div>
    )
}