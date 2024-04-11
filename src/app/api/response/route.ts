import { NextResponse, NextRequest } from "next/server";
import prisma from "@/server/db/client";

//Create the new response to the specific ticket in the database
export async function GET(request:NextRequest){

  try {
    const ticketId=request.nextUrl.searchParams.get("ticketId")
  
    const responses=await prisma.ticketResponse.findMany({where:{ticketIdRef:Number(ticketId)}})
    return NextResponse.json(responses);
  } catch (error) {
    console.error("Error getting the responses:", error);
    return NextResponse.json({ status: 500, error: "Internal server error" });
  }
}
export async function POST(request: NextRequest) {
    const { ticketId, responseText } = await request.json();

    try {
      
      const newResponse = await prisma.ticketResponse.create({
        data: {
          text: responseText,
          ticket: {
            connect: { ticketId: ticketId },
          },
        },
      });

      return NextResponse.json({
        status: 201,
        message: "Response created successfully",
      });
    } catch (error) {
      console.error("Error creating response:", error);
      return NextResponse.json({ status: 500, error: "Internal server error" });
    }

}