"use client";
import { GET_ALL_USERS } from "@/lib/gql/queries";
import gqlClient from "@/services/graphql";
import { useEffect, useState } from "react";
import { User } from "../../generated/prisma";
import AddUser from "./Buttons/AddUser";
import UserCard from "./Card/UserCard";



export default function AdminDashboard() {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    async function getAllUsers() {
      const data: {
        getAllUsers: User[];
      } = await gqlClient.request(GET_ALL_USERS);
      const users = data?.getAllUsers || [];
      setUsers(users);
    }
    getAllUsers();
  }, []);

  return (

    <div className="min-h-screen p-6 w-[25%] dark:bg-gray-950 rounded-2xl mt-4 shadow-md">
      <h1 className="text-3xl font-bold  mb-6">Admin Dashboard</h1>

      <div className="flex flex-col gap-6 w-full">
        <div className="light:bg-white rounded-xl shadow-md p-6 border">
          <h2 className="text-lg font-semibold mb-4 flex items-center gap-2 light:text-black">
            👥 Manage Users
          </h2>
          <AddUser />
        </div>

        <div className="light:bg-white rounded-xl shadow-md p-2">
          <h2 className="text-lg font-semibold mb-4  light:text-black">All Members</h2>
          <div className="flex flex-col gap-4">
            {users.length > 0 ? (
              users.map((user) => <UserCard key={user.id} user={user} />)
            ) : (
              <p className="light:text-gray-500 text-sm">No users found</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
