"use client";

import { User } from "@prisma/client";
import { useEffect, useState } from "react";

export default function Page() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch users data from the API route
    const fetchUsers = async () => {
      try {
        const res = await fetch("/api/users");
        if (!res.ok) {
          throw new Error("Failed to fetch users");
        }
        const data = await res.json();
        setUsers(data); // Set the fetched users to state
        setLoading(false); // Set loading to false once data is loaded
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    };

    fetchUsers();
  }, []); // Empty dependency array means this runs once on mount

  if (loading) return <div>Loading...</div>;

  return (
    <div className="bg-gray-100 p-4">
      <h1 className="text-2xl font-semibold text-gray-800">Users</h1>
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            {user.name} ({user.email})
          </li>
        ))}
      </ul>
    </div>
  );
}
