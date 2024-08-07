"use client";
import { collection, deleteDoc, doc, getDocs } from "firebase/firestore";
import React, { useState, useEffect } from "react";
import db from "../components/firebaseConfig";

interface UserData {
  id: string;
  fName: string;
  fEmail: string;
}

export default function Read() {
  const [userData, setUserData] = useState<UserData[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");

  const fetchData = async () => {
    try {
      const snapShots = await getDocs(collection(db, "Todo"));
      const user_data = snapShots.docs.map((doc) => {
        const data = doc.data() as UserData;
        return {
          ...data,
          id: doc.id,
        };
      });
      setUserData(user_data);
    } catch (error) {
      console.error("Error fetching data: ", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleDelete = async (id: string) => {
    setIsLoading(true);
    try {
      await deleteDoc(doc(db, "Todo", id));
      setMessage("Data Deleted");
      fetchData();
    } catch (error) {
      console.log(error);
      setMessage("Error deleting data");
    }
    setIsLoading(false);
  };

  return (
    <div className="flex justify-center items-center">
      {isLoading && <div role="alert">{message}</div>}
      {userData.length > 0 ? (
        userData.map((user) => (
          <div key={user.id} className="max-w-sm rounded overflow-hidden shadow-lg bg-white m-4">
            <div className="px-6 py-4">
              <div className="font-bold text-xl mb-2">{user.fName}</div>
              <p className="text-gray-700 text-base">{user.fEmail}</p>
              <div className="mt-2 gap-2 flex">
                <button
                  onClick={() => handleDelete(user.id)}
                  className="bg-red-600 text-white p-1 rounded"
                >
                  Delete
                </button>
                <button className="bg-purple-800 text-white p-1 rounded">
                  Edit
                </button>
              </div>
            </div>
          </div>
        ))
      ) : (
        <p>No data found</p>
      )}
    </div>
  );
}
