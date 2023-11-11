import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server"
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/auth/authOptions';

// FETCH ALL ORDERS

export const GET = async (req: NextRequest) => {
    const session = await getServerSession(authOptions);

    if(session){
        try {
            
            if(session.user.isAdmin){
                const orders = await prisma.order.findMany()
                return new NextResponse(JSON.stringify(orders), { status: 200 });
            }
            const orders = await prisma.order.findMany({
                where:{
                    userEmail: session.user.email!
                }
            })
            return new NextResponse(JSON.stringify(orders), { status: 200 });

            
        } catch (error) {
            return new NextResponse("Something went wrong!", { status: 500 });
        }
    } else {
        return new NextResponse("You are not authenticated!", { status: 401 });
    }
}

// CREATE ORDER

export const POST = async (req:NextRequest) => {
    const session = await getServerSession(authOptions);

    if(session){

        try {
            const body = await req.json();
            if(session.user){
                const order = await prisma.order.create({data:body})
                return new NextResponse(JSON.stringify(order), { status: 200 });
            }
        } catch (error) {
            return new NextResponse("Something went wrong!", { status: 500 });
        }
        
    } else {
        return new NextResponse("You are not authenticated!", { status: 401 });
    }
}