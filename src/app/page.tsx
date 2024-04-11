"use client";
import FormInput from "@/components/FormInput";
import FormTextbox from "@/components/FormTextbox";
import Image from "next/image";

import { createRef, FormEvent, useRef, useState } from "react";


import { BASE_API_URL } from "../utils/constants";

import { ToastContainer, toast, Zoom } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Home() {


  const formRef = useRef<HTMLFormElement>(null);

  const submitTicket = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

   const formData = new FormData(event.currentTarget);

   const name = formData.get("name") as string;
   const email = formData.get("email") as string;
   const description = formData.get("description") as string;

   const requestBody = JSON.stringify({ name, email, description });

   const response = await fetch(`${BASE_API_URL}/api/ticket`, {
     method: "POST",
     headers: {
       "Content-Type": "application/json",
     },
     body: requestBody,
   });

   if(!response.ok){
    throw new Error("Error while making the ticket. Try Again ")
   }

    formRef.current?.reset();
    toast("Successfully Created Ticket!", {
      position: "top-center",
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
      closeButton: false,
      pauseOnHover: false,
      draggable: false,
      progress: undefined,
      theme: "dark",
      transition: Zoom,
    });

  };
  return (
    <main className="min-h-screen flex items-center justify-center">
      <ToastContainer />
      <div className="rounded-md border-2 w-3/4 md:w-1/2 md:min-h-96 justify-center p-5">
        <h1 className="font-bold text-2xl"> Help Ticket Request</h1>
        <form ref={formRef} className="flex flex-col space-y-5 pt-5" onSubmit={submitTicket}>
          <FormInput name="name" label="Name" />
          <FormInput name="email" label="Email" />

          <FormTextbox name="description" label="Problem Description" />

          <button className="border-2 border-main rounded-md hover:bg-main hover:text-white p-2 text-lg font-bold">
            Submit Ticket
          </button>
        </form>
      </div>
    </main>
  );
}
