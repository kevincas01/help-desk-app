import React from "react";
import ResponseForm from "./ResponseForm";

import {BASE_API_URL} from "../utils/constants"

interface TicketResponse {
  responseId: number;
  text: string;
}
const getData = async (ticketId: number) => {
  
    const response = await fetch(
      `${BASE_API_URL}/api/response?ticketId=${ticketId}`,
      {
        cache: "no-store",
       next: { tags: ['responses'] } }
    );

    if (!response.ok) {
      throw new Error("Error while getting the responses. Try Again ");
    }
    return response.json();
  
};
const Responses = async ({ ticketId }: { ticketId: number }) => {
  if (!BASE_API_URL) {
    return null;
  }
  const responses = await getData(ticketId);
  return (
    <div className="my-2 border-t-2 border-black ">
        <div >
            {responses.map((response:TicketResponse)=>{
                return (
                  <div
                    key={response.responseId}
                    className="ml-10 mb-4 relative flex flex-row items-center"
                  >
                    <span className="absolute left-0 top-1/2 transform -translate-y-1/2 w-3 h-3 border-2 border-main rounded-full"></span>
                    
                    <p className="pl-4">{response.text}</p>
                  </div>
                );
            })}
        </div>
      <ResponseForm ticketId={ticketId} />
    </div>
  );
};

export default Responses;
