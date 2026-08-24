"use client";
import { GET_ALL_USERS } from "@/lib/gql/queries";
import gqlClient from "@/services/graphql";
import { useEffect, useState } from "react";
import { User } from "../../generated/prisma";
import AddUser from "./Buttons/AddUser";
import UserCard from "./Card/UserCard";



import { UserSkeleton } from "./ui/Skeleton";

export default function AdminDashboard() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function getAllUsers() {
      setLoading(true);
      try {
        const data: {
          getAllUsers: User[];
        } = await gqlClient.request(GET_ALL_USERS);
        setUsers(data?.getAllUsers || []);
      } catch (e: any) {
        console.error(e.message);
      } finally {
        setLoading(false);
      }
    }
    getAllUsers();
  }, []);

  return (
    <div className="w-full p-4 sm:p-6 dark:bg-gray-950 rounded-2xl mt-4 shadow-md border border-gray-100 dark:border-gray-800">
      <h1 className="text-2xl sm:text-3xl font-bold mb-6">Admin Dashboard</h1>

      <div className="flex flex-col gap-6 w-full">
        <div className="light:bg-white rounded-xl shadow-md p-4 sm:p-6 border border-gray-200 dark:border-gray-800">
          <h2 className="text-lg font-semibold mb-4 flex items-center gap-2 light:text-black">
            👥 Manage Users
          </h2>
          <AddUser />
        </div>

        <div className="light:bg-white rounded-xl shadow-md p-4 border border-gray-200 dark:border-gray-800">
          <h2 className="text-lg font-semibold mb-4 light:text-black">All Members</h2>
          <div className="flex flex-col gap-3">
            {loading ? (
              Array.from({ length: 3 }).map((_, i) => <UserSkeleton key={i} />)
            ) : users.length > 0 ? (
              users.map((user) => <UserCard key={user.id} user={user} />)
            ) : (
              <p className="light:text-gray-500 text-sm py-2">No users found</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
