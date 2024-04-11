
import React, { useState } from "react";
import ResponseForm from "./ResponseForm";
import Responses from "./Responses";
import TicketStatus from "./TicketStatus";

interface TicketRowProps {
  ticketId:number;
  name: string;
  email: string;
  status:string;
  description: string;
  responses: TicketResponse[];
}

interface TicketResponse {
  responseId: number;
  text: string;
}

const TicketRow: React.FC<TicketRowProps> = ({
  ticketId,
  name,
  email,
  status,
  description,
  responses,
}) => {

  
  const getStatusStyle = (status: string): string => {
    switch (status) {
      case "New":
        return "w-24 bg-blue-500 text-white font-semibold rounded-lg  py-2 flex justify-center";
      case "Resolved":
        return "w-24 bg-green-500 text-white font-semibold rounded-lg  py-2 py-2 flex justify-center";
      case "In Progress":
        return "w-24  bg-white text-black font-semibold border border-black rounded-lg box-border py-2 py-2 flex justify-center";
      default:
        return "";
    }
  };

  return (
    <div className="flex flex-col border-2 border-main p-5 rounded-md">
      <div className="w-full mb-2 flex flex-row  flex-wrap justify-between">
        <div>
          <h3 className="font-bold text-xl leading-3">{name}</h3>
          <h4 className="text-sm leading-1"> {email}</h4>
        </div>
        <TicketStatus status={status} ticketId={ticketId} />
      </div>

      <div className="w-full font-semibold ">{description}</div>

      <Responses ticketId={ticketId} />
    </div>
  );
};

export default TicketRow;
