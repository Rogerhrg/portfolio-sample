import { Router } from 'express'
import { body } from 'express-validator'
import { createAccount, getUser, login, updateProfile, uploadImage } from './handlers'
import { handleInputErrors } from './middleware/validation'
import { authenticate } from './middleware/auth'

const router = Router()

router.post('/auth/register', 
    body('handle')
        .notEmpty()
        .withMessage('El handle de usuario es obligatorio'),
    body('name')
        .notEmpty()
        .withMessage('El nombre de usuario es obligatorio'),
    body('email')
        .isEmail()
        .withMessage('El email es obligatorio'),
    body('password')
        .isLength({ min: 8 })
        .withMessage('La contraseña debe tener al menos 8 caracteres'),
    handleInputErrors,
    createAccount)

router.post('/auth/login',
    body('email')
        .isEmail()
        .withMessage('El email es obligatorio'),
    body('password')
        .notEmpty()
        .withMessage('La contraseña no puede estar vacía'),
    handleInputErrors,
    login
)

router.get('/user', authenticate , getUser)

router.patch('/user',
    body('handle')
        .notEmpty()
        .withMessage('El handle no puede estar vacio'),
    handleInputErrors,
    authenticate, 
    updateProfile
)

router.post('/user/image', authenticate , uploadImage)

export default router