"use client"
import { revalidateTickets } from '@/app/actions';
import React, { useState } from 'react'

import { BASE_API_URL } from "../utils/constants";

interface TicketStatusProps {
  status: string;
  ticketId: number;
}
const TicketStatus: React.FC<TicketStatusProps> = ({ status, ticketId }) => {
  const [isBeingChanged, setIsBeingChanged] = useState(false);

  if (!BASE_API_URL) {
    return null;
  }
  const getStatusStyle = (status: string): string => {
    switch (status) {
      case "NEW":
        return "w-28 bg-blue-500 text-white font-semibold rounded-lg py-2 flex justify-center";
      case "RESOLVED":
        return "w-28 bg-green-500 text-white font-semibold rounded-lg py-2 flex justify-center";
      case "INPROGRESS":
        return "w-28 bg-yellow-500 text-white font-semibold rounded-lg py-2 flex justify-center";
      default:
        return "";
    }
  };

  const handleStatusChange = async (newStatus: string) => {

    const requestBody = JSON.stringify({ newStatus, ticketId });

    const response = await fetch(`${BASE_API_URL}/api/ticket`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: requestBody,
    });
    if (!response.ok) {
      throw new Error("Error while updating the ticket status. Try Again ");
    }

    revalidateTickets()
    setIsBeingChanged(false);
  };

  return (
    <div>
      {isBeingChanged ? (
        <div className="flex flex-row  border-black border rounded-lg">
          <button
            className="w-16 py-2 text-xs hover:bg-blue-500 hover:text-white rounded-l-lg"
            onClick={() => handleStatusChange("NEW")}
          >
            NEW
          </button>
          <div className="border-l border-r"></div>
          <button
            className="w-20 py-2 text-xs hover:bg-yellow-500 hover:text-white "
            onClick={() => handleStatusChange("INPROGRESS")}
          >
            IN PROGRESS
          </button>
          <div className="border-l border-r"></div>
          <button
            className="w-16 py-2 text-xs hover:bg-green-500 hover:text-white rounded-r-lg"
            onClick={() => handleStatusChange("RESOLVED")}
          >
            RESOLVED
          </button>
        </div>
      ) : (
        <button
          className={getStatusStyle(status)}
          onClick={() => setIsBeingChanged(true)}
        >
          {status === "INPROGRESS" ? <>IN PROGRESS</> : status}
        </button>
      )}
    </div>
  );
};

export default TicketStatus