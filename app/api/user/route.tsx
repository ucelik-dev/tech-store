import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from 'bcryptjs'
import { SignUpFormSchema } from "@/app/validationSchemas";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/auth/authOptions";

export async function POST(req: NextRequest) {
    const session = await getServerSession(authOptions);
  
    if(session){
        try {
            const body = await req.json();
            const { name, email, password } = SignUpFormSchema.parse(body);
            const hashedPassword = await bcrypt.hash(password, 10);

            const existingUser = await prisma.user.findUnique({ where: { email: email}});
            if(existingUser) return NextResponse.json({ user: null, message: "User with this email already exists." }, { status: 409 })

            const newUser = await prisma.user.create({
                data: {
                    name: name, email: email, password: hashedPassword
                }
            });

            return NextResponse.json({ user: newUser, message: "User created successfully."}, { status: 201 })

        } catch (error) {
            return NextResponse.json({ message: "Something went wrong."}, { status: 500 })
        }
    } else {
        return new NextResponse("You are not authenticated!", { status: 401 });
    }
}