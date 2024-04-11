"use server";

import { revalidateTag } from "next/cache";

export  async function revalidateResponses() {
  revalidateTag("responses");
}


export  async function revalidateTickets() {
  revalidateTag("tickets");
}