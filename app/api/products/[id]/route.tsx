import { authOptions } from "@/app/auth/authOptions";
import prisma from "@/prisma/client";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";


export async function PATCH(request: NextRequest, {params}: {params: {id: string}}){
    const session = await getServerSession(authOptions);
    if(!session?.user.isAdmin) return NextResponse.json({message: "You are not authorized!"}, {status: 401});
    
    const body = await request.json();

    const product = await prisma.product.findUnique({
        where: { id: parseInt(params.id)}
    });

    if(!product) return NextResponse.json({error: 'Invalid product'}, {status: 404});

    const updatedProduct = await prisma.product.update({
        where: {id: product.id},
        data: {
            imgUrl: body.imgUrl,
            title: body.title,
            price: body.price,
            category: body.category,
            details: body.details,
        }
    });

    return NextResponse.json(updatedProduct);
}




export async function DELETE(request: NextRequest, {params}: {params: {id: string}}){
    const session = await getServerSession(authOptions);
    if(!session?.user.isAdmin) return NextResponse.json({message: "You are not authorized!"}, {status: 401});

    const product = await prisma.product.findUnique({
        where: { id: parseInt(params.id)}
    });

    if(!product) return NextResponse.json({error: 'Invalid product'}, {status: 404});

    await prisma.product.delete({
        where: { id: product.id }
    });

    return NextResponse.json({});
}