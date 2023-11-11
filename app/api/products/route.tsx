import { authOptions } from "@/app/auth/authOptions";
import prisma from "@/prisma/client";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    const session = await getServerSession(authOptions);
    if(!session) return NextResponse.json({message: "You are not authorized!"}, {status: 401});
    
    const body = await request.json();

    const newProduct = await prisma.product.create({
        data: { title: body.title, price: body.price, category: body.category, imgUrl: body.imgUrl, details: body.details },
    });

    return new NextResponse(JSON.stringify(newProduct), { status: 201 });
}