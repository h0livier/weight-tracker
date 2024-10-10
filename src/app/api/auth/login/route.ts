import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import prisma from '@/lib/prisma'
import { NextResponse } from 'next/server'

const SECRET_KEY = process.env.JWT_SECRET_KEY

interface LoginRequest{
    email: string,
    password: string
}

export async function POST(req: Request) {
    const { email, password }: LoginRequest = await req.json()

    try {
        // Chercher l'utilisateur par email
        const user = await prisma.user.findUnique({
            where: { email },
        })

        if (!user) {
            return NextResponse.json({ "message": 'Email or Password incorrect' }, {status: 401})
        }

        // Comparer les mots de passe
        const passwordMatch = await bcrypt.compare(password, user.password)

        if (!passwordMatch) {
            return NextResponse.json({ "message": 'Email or Password incorrect' }, {status: 401})
        }

        // Générer un token JWT
        const token = jwt.sign({ userId: user.id }, SECRET_KEY as string, {
            expiresIn: '1h',
        })

        return NextResponse.json({ token: token}, {status: 200})
    } catch (error) {
        console.error(error)
        return NextResponse.json({ "message": 'Server Error' }, {status: 500})
    }
}
