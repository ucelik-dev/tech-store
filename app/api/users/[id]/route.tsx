import { authOptions } from "@/app/auth/authOptions";
import prisma from "@/prisma/client";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";


// CHANGE THE STATUS OF AN ORDER
export const PUT = async ( req: NextRequest,  { params }: { params: { id: string } }) => {
  const session = await getServerSession(authOptions);
  
  if(session){
    try {
      const body = await req.json();
      const role = body.isAdmin ? true : false;

      await prisma.user.update({
        where: {
          id: parseInt(params.id),
        },
        data: { isAdmin: role },
      });
      return new NextResponse(
        JSON.stringify({ message: "User has been updated!" }),
        { status: 200 }
      );
    } catch (err) {
      console.log(err);
      return new NextResponse(
        JSON.stringify({ message: "Something went wrong!" }),
        { status: 500 }
      );
    }
  } else {
    return new NextResponse("You are not authenticated!", { status: 401 });
  }
};