import { NextResponse, NextRequest } from "next/server";
import prisma from "@/server/db/client";

//Get the tickets from the database
export async function GET() {
  try {
    const tickets = await prisma.ticket.findMany({
      orderBy: {
        status: "asc", // or 'desc' for descending order
      },
    });

    return NextResponse.json(tickets);
  } catch (error) {
    console.error("Error getting ticket:", error);
    return NextResponse.json({ status: 500, error: "Internal server error" });
  }
}
export async function PUT(request: NextRequest) {
  const { ticketId, newStatus } = await request.json();

  try {
    const updatedTicket = await prisma.ticket.update({
      where: { ticketId: ticketId },
      data: {
        status: newStatus,
      },
    });

    return NextResponse.json({
      status: 201,
      message: "Ticket updated successfully",
    });
  } catch (error) {
    console.error("Error updating ticket:", error);
    return NextResponse.json({ status: 500, error: "Internal server error" });
  }
}

//Create the new ticket in the database
export async function POST(request: NextRequest) {
  const { name, email, description } = await request.json();

  try {
    const newTicket = await prisma.ticket.create({
      data: {
        email: email,
        name: name,
        description: description,
      },
    });

    return NextResponse.json({
      status: 201,
      message: "Ticket created successfully",
    });
  } catch (error) {
    console.error("Error creating ticket:", error);
    return NextResponse.json({ status: 500, error: "Internal server error" });
  }
}
