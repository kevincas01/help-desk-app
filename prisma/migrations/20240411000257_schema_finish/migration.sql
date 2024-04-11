-- CreateEnum
CREATE TYPE "TicketStatus" AS ENUM ('NEW', 'INPROGRESS', 'RESOLVED');

-- CreateTable
CREATE TABLE "Ticket" (
    "ticketId" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "status" "TicketStatus" NOT NULL DEFAULT 'NEW',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Ticket_pkey" PRIMARY KEY ("ticketId")
);

-- CreateTable
CREATE TABLE "TicketResponse" (
    "responseId" SERIAL NOT NULL,
    "text" TEXT NOT NULL,
    "ticketIdRef" INTEGER NOT NULL,

    CONSTRAINT "TicketResponse_pkey" PRIMARY KEY ("responseId")
);

-- AddForeignKey
ALTER TABLE "TicketResponse" ADD CONSTRAINT "TicketResponse_ticketIdRef_fkey" FOREIGN KEY ("ticketIdRef") REFERENCES "Ticket"("ticketId") ON DELETE RESTRICT ON UPDATE CASCADE;
