import { hash } from 'crypto'
import User from '../models/user'
import { Request, Response } from 'express'
import { check, validationResult } from 'express-validator'
import slug from 'slug'
import { hashPassword } from '../utils/auth'
import { checkPassword } from '../utils/auth'
import { generateJWT } from '../utils/jwt'

export const createAccount = async (req: Request, res: Response) => {
    
    const {email, password} = req.body

    const userExist = await User.findOne({ email })
    if (userExist) {
        const error = new Error('Email ya registrado')
        return res.status(409).json({ error: error.message })
    }
    
    const handle = slug(req.body.handle, '')
    const handleExist = await User.findOne({ handle })
    if (handleExist) {
        const error = new Error('Nombre de usuario no disponible')
        return res.status(409).json({ error: error.message })
    }

    const user = new User(req.body)
    user.password = await hashPassword(password)
    user.handle = handle

    await user.save()
    res.send('Registro creado')
}

export const login = async (req: Request, res: Response) => {

    const {email, password} = req.body

    const user = await User.findOne({ email })
    if (!user) {
        const error = new Error('Usuario no existe')
        return res.status(404).json({ error: error.message })
    }

    const isPasswordCorrect = await checkPassword(password, user.password)
    if (!isPasswordCorrect) {
        const error = new Error('Contraseña incorrecta')
        return res.status(401).json({ error: error.message })
    }
    const token = generateJWT({id:user.id})
    res.send(token)
}