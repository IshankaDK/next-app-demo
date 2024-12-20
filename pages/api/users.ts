import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";

// Initialize Prisma client
const prisma = new PrismaClient();

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
  } else if (req.method === "POST") {
    try {
      const { name, email } = req.body;

      // Basic validation
      if (!name || !email) {
        return res.status(400).json({ error: "Name and email are required" });
      }

      // Create a new user in the database
      const user = await prisma.user.create({
        data: {
          name,
          email,
        },
      });

      // Respond with the created user
      return res.status(201).json(user);
    } catch (error) {
      console.error("Error creating user:", error);
      res.status(500).json({ error: "Internal Server Error", message: error });
    }
  } else {
    // Handle any other HTTP method
    res.status(405).json({ error: `Method ${req.method} Not Allowed` });
  }
}
