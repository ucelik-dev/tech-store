import { authOptions } from "@/app/auth/authOptions";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { hash } from 'bcryptjs'
import prisma from "@/prisma/client";

export const POST = async (request:NextRequest) => {
        try {
            const {name, email, password} = await request.json();
            // validate email and password here

            const existingUser = await prisma.user.findUnique({ where: { email: email } });
            if(existingUser) { return NextResponse.json({ user: null, message: "User with this email already exists!" }, { status: 409 }) }

            const hashedPasssword = await hash(password, 10);
            const newUser = await prisma.user.create({
                data: { name: name, email: email, password: hashedPasssword }
            });

            const { password: newUserPassword, ...rest } = newUser;
            return NextResponse.json({ user: newUserPassword, message: "New user created successfully."}, { status: 201 })

        } catch (error) {
            return new NextResponse("Something went wrong!", { status: 500 });
        }

}