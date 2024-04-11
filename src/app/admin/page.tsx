import TicketRow from "@/components/TicketRow";
import React from "react";

import { BASE_API_URL } from "../../utils/constants"
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin Page",
  description: "View and manage help tickets.",
};

async function getData() {
 const response = await fetch(
   `${BASE_API_URL}/api/ticket`,
   {
     cache: "no-store",
   }
 );
  if (!response.ok) {
    throw new Error("Error while getting the tickets. Try Again ");
  }

  return response.json();
}
interface Ticket {
  ticketId: number;
  name: string;
  email: string;
  status:string;
  description: string;
  createdAt: Date;
  responses: TicketResponse[];
}

interface TicketResponse {
  responseId: number;
  text: string;
}
const Admin = async () => {

  if (!BASE_API_URL) {
    return null;
  }
  const data= await getData()

  return (
    <main className="min-h-screen flex  flex-col items-center">
      <div className=" mt-10 flex  flex-col items-center">
        <h1 className="font-bold  text-4xl"> Admin Panel</h1>
        {data.length > 0 ? (
          <>
            <h2 className="font-bold text-xl mt-5">View the tickets</h2>
            <div className="flex flex-col m-5 space-y-5">
              {data.map((ticket: Ticket) => (
                <TicketRow
                  key={ticket.ticketId}
                  ticketId={ticket.ticketId}
                  name={ticket.name}
                  email={ticket.email}
                  status={ticket.status}
                  description={ticket.description}
                  responses={ticket.responses}
                />
              ))}
            </div>
          </>
        ) : (
          <h2 className="font-bold text-xl  mt-5">There are no current Tickets to review</h2>
        )}
      </div>
    </main>
  );
};

export default Admin;
