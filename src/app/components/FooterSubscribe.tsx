"use client";
import { useState } from "react";

function FooterSubscribe() {
  const [email, setEmail] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    e.currentTarget.submit();
    setEmail("");
  };

  return (
    <form
      action="mailto:support@medreminder.com"
      method="POST"
      encType="text/plain"
      className="flex w-full"
      onSubmit={handleSubmit}
    >
      <input
        type="email"
        name="email"
        placeholder="Enter your email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="flex-1 bg-white shadow-sm px-4 py-3 rounded-l-xl focus:outline-none focus:ring-2 focus:ring-sky-400 text-gray-900 placeholder:text-gray-500"
      />
      <button
        type="submit"
        className="bg-blue-600 hover:bg-blue-700 shadow-md px-6 py-3 rounded-r-xl font-medium text-white transition"
      >
        Subscribe
      </button>
    </form>
  );
}

export default FooterSubscribe;
