import bcrypt from 'bcrypt'
import prisma from '@/lib/prisma'
import { NextResponse } from 'next/server'

interface RegisterRequest{
    email: string,
    password: string
}

export async function POST(req: Request) {
    const { email, password }: RegisterRequest = await req.json()

    try {
        // Vérifier si l'utilisateur existe déjà
        const existingUser = await prisma.user.findUnique({
            where: { email: email },
        })

        if (existingUser) {
            return NextResponse.json({ "message": 'User Already Existing' }, {status: 400})
        }

        // Hash du mot de passe
        const hashedPassword = await bcrypt.hash(password, 10)

        await prisma.user.create({
            data: {
                email,
                password: hashedPassword,
            },
        })

        return NextResponse.json({ "message": 'User Created' }, {status: 201})
    } catch (error) {
        console.error(error)
        return NextResponse.json({ "message": 'Server Error' }, {status: 500})
    }
}
