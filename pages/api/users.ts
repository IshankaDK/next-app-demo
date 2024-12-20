import { PrismaClient } from "@prisma/client";

// Initialize Prisma client
const prisma = new PrismaClient();

import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    try {
      // Fetch all users from the database
      const users = await prisma.user.findMany();
      res.status(200).json(users); // Send back the users in JSON format
    } catch (error) {
      res.status(500).json({ error: "Internal Server Error", message: error });
    }
  } else {
    // Handle any other HTTP method
    res.status(405).json({ error: `Method ${req.method} Not Allowed` });
  }
}
