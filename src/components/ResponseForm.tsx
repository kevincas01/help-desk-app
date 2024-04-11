"use client";
import React, { FormEvent, useState } from "react";
import FormTextbox from "./FormTextbox";
import {revalidateResponses} from "@/app/actions";


import { BASE_API_URL } from "../utils/constants";
const ResponseForm = ({ ticketId }: { ticketId: number }) => {
  const [isResponding, setIsResponding] = useState(false);

  const handleButtonClick = () => {
    setIsResponding(true);
  };

  const submitResponse = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);

    const responseText = formData.get("response") as string;

    const requestBody = JSON.stringify({ responseText, ticketId });

    const response = await fetch(`${BASE_API_URL}/api/response`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: requestBody,
    });

    revalidateResponses();
    setIsResponding(false);
  };

  return (
    <div>
      {isResponding ? (
        <div className="mt-4">
          {/* Render a button to cancel response */}

          {/* Render the form */}
          <form onSubmit={submitResponse}>
            <FormTextbox name="response" label="Response" />
            <div className="flex flex-row justify-around mt-4">
              <button className="border-2 border-main rounded-md hover:bg-main hover:text-white p-2 text-lg font-bold">
                Submit Response
              </button>
              <button
                className="border-2 border-main rounded-md hover:bg-main hover:text-white p-2 text-lg font-bold"
                onClick={() => setIsResponding(false)}
              >
                Cancel Response
              </button>
            </div>
          </form>
        </div>
      ) : (
        <div className="mt-4 flex justify-center">
          {/* Render a button to start response */}
          <button
            className="border-2 border-main rounded-md hover:bg-main hover:text-white p-2 text-lg font-bold"
            onClick={handleButtonClick}
          >
            Add Response
          </button>
        </div>
      )}
    </div>
  );
};

export default ResponseForm;
