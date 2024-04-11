import { NextResponse, NextRequest } from "next/server";
import prisma from "@/server/db/client";

//Get the tickets from the database
export async function GET(){

  const tickets = await prisma.ticket.findMany({
    orderBy: {
      status: "asc", // or 'desc' for descending order
    },
  });

  return NextResponse.json(tickets
  );

}
export async function PUT(request: NextRequest) {
  const { ticketId, newStatus } = await request.json();
 
  const updatedTicket = await prisma.ticket.update({
    where: { ticketId: ticketId },
    data: {
      status: newStatus,
    },
  });

  return NextResponse.json({ data: updatedTicket }, { status: 201 });
}

//Create the new ticket in the database
export async function POST(request: NextRequest) {
  const {name,email,description} = await request.json();
  
  const newTicket = await prisma.ticket.create({
    data: {
      email: email,
      name: name,
      description:description
    },
  });

  return NextResponse.json(
    { data: newTicket },
    { status: 201 }
  );
}

