import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken'
const PORT = 3000;
const SECRET = 'senha_aplicacao'
const app = express()
app.use(express.json())
async function generateToken(payload) {
    return jwt.sign(payload, SECRET, { expiresIn: 86400 })
}
const users = [
    { email: 'yure@gmail.com', password: bcrypt.hashSync('12345678', 8) }
];
app.post('/login', async (req, res) => {
    const { email, password } = req.body
    const user = users.find(u => u.email)
    if (!user) return res.status(404).json({ message: 'Não encontrado' })
    if (bcrypt.compareSync(password, user.password)) {
        const token = await generateToken({ email: user.email })
        return res.status(200).json({ token })
    }
    return res.status(401).json({ message: 'Senha Incorreta' })
});

app.get('/protegido', (req, res, next) => {
    const rawToken = req.headers.authorization
    if (!rawToken) {
        return res.status(401).json({ message: 'Não autenticado' })
    }
    const token = rawToken.replace('Bearer ', '')
    jwt.verify(token, SECRET, (err, decoded) => {
        if (err) return res.status(401).json({ message: 'Não autorizado' })
        req.userId = decoded.email
        next()
    })
},
    (req, res) => {
        return res.json({
            message: 'Recurso Protegido',
            user: req.userId
        })
    })

app.listen(PORT, () => console.log('Servidor rodando...'))
