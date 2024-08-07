"use client";
import { addDoc, collection, Timestamp } from "firebase/firestore";
import React, { useState } from "react";
import db from "../components/firebaseConfig";
import { useNavigate } from "react-router-dom";

export default function Create() {
  const [fName, setFName] = useState("");
  const [fEmail, setFEmail] = useState("");
  const navigate =useNavigate()

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    let data = {
      _id: new Date().getUTCMilliseconds(),
      fName: fName,
      fEmail: fEmail,
      created: Timestamp.now(),
    };
    const ref = collection(db, "Todo");
    try {
      await addDoc(ref, data);
      setFName('')
      setFEmail('')
      navigate('/')
    } catch (error) {
        console.log(error);
        
    }
  };
  return (
    <div>
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="w-full max-w-md p-8 space-y-4 bg-white rounded-lg shadow-md">
          <h2 className="text-2xl font-bold text-center text-gray-800">
            Add a card
          </h2>
          <form onSubmit={handleSubmit}>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Name
              </label>
              <input
                type="name"
                className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                value={fName}
                onChange={(e) => setFName(e.target.value)}
                required
              />
            </div>
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Email
              </label>
              <input
                type="Email"
                className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                value={fEmail}
                onChange={(e) => setFEmail(e.target.value)}
                required
              />
            </div>
            <button
              type="submit"
              className="w-full px-4 py-2 mt-4 text-white bg-indigo-600 rounded-md hover:bg-indigo-700"
            >
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
