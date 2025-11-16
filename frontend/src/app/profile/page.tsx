"use client";

import AppLayout from "../../components/AppLayout";
import { getUser } from "../../lib/api"; 

export default function ProfilePage() {
  const user = getUser();

  if (!user) {
    return (
      <AppLayout>
        <div className="flex justify-center items-center h-full text-white">
          <p className="text-lg opacity-80">No user information found.</p>
        </div>
      </AppLayout>
    );
  }

  return (
    <AppLayout>
      <div className="w-full flex justify-center px-4 py-6">
        <div className="w-full max-w-md bg-neutral-800 text-white rounded-xl p-6 shadow-lg border border-neutral-700">

          {/* Header */}
          <h1 className="text-2xl font-bold mb-6 text-center sm:text-left">
            User Profile
          </h1>

          {/* Info Cards */}
          <div className="space-y-4">

            <div className="bg-neutral-900 p-4 rounded-lg">
              <p className="text-gray-400 text-xs sm:text-sm">Name</p>
              <p className="text-base sm:text-lg font-semibold break-words">{user.name}</p>
            </div>

            <div className="bg-neutral-900 p-4 rounded-lg">
              <p className="text-gray-400 text-xs sm:text-sm">Email</p>
              <p className="text-base sm:text-lg font-semibold break-words">{user.email}</p>
            </div>

            <div className="bg-neutral-900 p-4 rounded-lg">
              <p className="text-gray-400 text-xs sm:text-sm">User ID</p>
              <p className="text-base sm:text-lg font-semibold break-words">{user.id}</p>
            </div>

          </div>
        </div>
      </div>
    </AppLayout>
  );
}
