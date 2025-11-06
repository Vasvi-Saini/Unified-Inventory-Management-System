"use client";
import { Avatar } from "@radix-ui/themes";
import { AtSign, Edit3, Mail, Save, Shield, User, X } from "lucide-react";
import { useState } from "react";

import EditAvatarBtn from "@/Components/Buttons/EditAvatarBtn";
import { useUserContext } from "@/Components/contexts/UserContext";
import { UPDATE_USER } from "@/lib/gql/mutation";
import gqlClient from "@/services/graphql";
import { toast } from "sonner";

interface UserProfile {
  id: string;
  name: string;
  email: string;
  username: string;
  password: string;
  avatar?: string;
  role: "staff" | "admin" | "user";
}

interface FieldProps {
  label: string;
  icon: React.ReactNode;
  value: string;
  isEditing: boolean;
  onChange: (value: string) => void;
  type?: string;
  prefix?: string;
}

export default function ProfilePage() {
  const [isEditing, setIsEditing] = useState(false);

  const { user, setUser } = useUserContext();
  const [name, setName] = useState(user?.name);
  const [email, setEmail] = useState(user?.email);
  const [username, setUsername] = useState(user?.username);
  const [avatar, setAvatar] = useState(user?.avatar);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = async () => {
    const updatedUser = {
      userId: user?.id,
      name: name,
      username: username,
      email: email,
      avatar: avatar,
    };

    try {
      const res: {
        updated: boolean;
      } = await gqlClient.request(UPDATE_USER, updatedUser);
      console.log("res", res);
      if (res?.updated) {
        toast("profile updated successfully!");
      } else {
        toast("Something went wrong!");
      }
    } catch (err: any) {
      console.log("error while updating user", err.message);
      toast("Something went wrong!");
    }
    setIsEditing(false);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setUsername(user?.username);
    setName(user?.name);
    setEmail(user?.email);
    setAvatar(user?.avatar);
  };

  const getRoleBadgeStyle = (role: string) => {
    switch (role) {
      case "admin":
        return "bg-black text-white border-black";
      case "staff":
        return "bg-white text-black border-black";
      default:
        return "bg-gray-100 text-gray-600 border-gray-300";
    }
  };

  return (
    <div className="min-h-screen dark:bg-gradient-to-br from-gray-900 via-black to-gray-800 dark:text-white px-6 py-10">
      {/* Header */}
      <div className="max-w-5xl mx-auto flex items-center justify-between mb-10">
        <div>
          <h1 className="text-4xl font-semibold tracking-wide">Profile</h1>
          <p className="mt-2 text-gray-400">Manage your account information</p>
        </div>

        {!isEditing ? (
          <button
            onClick={handleEdit}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl border border-gray-700 dark:bg-gray-800  bg-blue-600 hover:bg-blue-800 dark:hover:bg-white text-white cursor-pointer dark:hover:text-black  transition-colors duration-300"
          >
            <Edit3 size={18} />
            Update Profile
          </button>
        ) : (
          <div className="flex gap-3">
            <button
              onClick={handleSave}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-green-500 text-black hover:bg-green-600 transition-colors duration-300"
            >
              <Save size={18} />
              Save
            </button>
            <button
              onClick={handleCancel}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-red-500 text-white hover:bg-red-600 transition-colors duration-300"
            >
              <X size={18} />
              Cancel
            </button>
          </div>
        )}
      </div>

      {/* Main Layout */}
      <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Card - Avatar & Account */}
        <div className="lg:col-span-1 space-y-6">
          {/* Avatar */}
          <div className="bg-white/5 backdrop-blur-lg border border-gray-700 rounded-2xl p-8 text-center shadow-lg">
            <div className="relative inline-block mb-6">
              {avatar ? (
                <img
                  src={avatar}
                  alt="Profile"
                  className="w-32 h-32 rounded-full object-cover shadow-md border-4 border-gray-700"
                />
              ) : (
                <Avatar
                  size="9"
                  radius="full"
                  fallback={user?.name[0].toUpperCase() || ""}
                />
              )}
              <EditAvatarBtn avatar={avatar} setAvatar={setAvatar} />
            </div>
            <h2 className="text-2xl font-medium">{user?.name}</h2>
            <div
              className={`mt-2 inline-block px-4 py-1 rounded-full text-sm font-medium uppercase tracking-wide ${getRoleBadgeStyle(
                user?.role || ""
              )}`}
            >
              {user?.role}
            </div>
          </div>

          {/* Account Details */}
          <div className="bg-white/5 backdrop-blur-lg border border-gray-700 rounded-2xl p-6 shadow-lg">
            <h3 className="text-lg font-medium mb-4">Account Details</h3>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-400">User ID</span>
                <span className="font-mono">{user?.id.slice(-8)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Account Type</span>
                <span className="capitalize">{user?.role}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Status</span>
                <span className="text-green-400">Active</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Card - Personal Info */}
        <div className="lg:col-span-2">
          <div className="bg-white/5 backdrop-blur-lg border border-gray-700 rounded-2xl shadow-lg">
            <div className="border-b border-gray-700 px-6 py-5">
              <h3 className="text-xl font-medium">Personal Information</h3>
            </div>

            <div className="p-6 space-y-6">
              {/* Full Name */}
              <div>
                <label className="block text-sm mb-2 light:text-black">
                  Name
                  <input
                    placeholder="Full Name"
                    value={name}
                    disabled={!isEditing}
                    onChange={(e) => setName(e.target.value)}
                    className="px-4 py-4 dark:bg-gray-900 border border-gray-700 rounded-lg w-full mt-2 light:text-black"
                  />
                </label>
              </div>

              {/* Email */}

              <div>
                <label className="block text-sm mb-2 light:text-black">
                  {" "}
                  Email
                  <input
                    placeholder="Email Address"
                    value={email}
                    disabled={!isEditing}
                    onChange={(e) => setEmail(e.target.value)}
                    type="email"
                    className="px-4 py-4 dark:bg-gray-900 border border-gray-700 rounded-lg w-full mt-2"
                  />
                </label>
              </div>

              {/* Username */}
              <div>
                <label className="block text-sm mb-2 light:text-black ">
                  {" "}
                  @ Username
                  <div className="relative ">
                    <span className=" px-2 ml-1 absolute left-0 bottom-1 transform -translate-y-1/2 text-white pointer-events-none text-base font-semibold">
                      @
                    </span>

                    <input
                      placeholder="Username"
                      value={username}
                      disabled={!isEditing}
                      onChange={(e) => setUsername(e.target.value)}
                      prefix="@"
                      className="px-7 py-4 dark:bg-gray-900 border border-gray-700 rounded-lg w-full mt-2"
                    />
                  </div>
                </label>
              </div>

              {/* Role */}
              <div>
                <label className="block text-sm mb-2 light:text-black">
                  <Shield size={16} className="inline mr-2" />
                  Role
                </label>
                <div className="px-4 py-3 dark:bg-gray-900 border border-gray-700 rounded-lg">
                  <span
                    className={`inline-block px-3 py-1 text-xs rounded-full font-medium uppercase ${getRoleBadgeStyle(
                      user?.role || ""
                    )}`}
                  >
                    {user?.role}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
