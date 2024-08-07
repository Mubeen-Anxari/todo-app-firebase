"use client";
import {
  addDoc,
  collection,
  doc,
  getDoc,
  Timestamp,
  updateDoc,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import db from "../components/firebaseConfig";
import { useNavigate, useParams } from "react-router-dom";

export default function Create() {
  const [fName, setFName] = useState("");
  const [fEmail, setFEmail] = useState("");
  const [isEdit, setIsEdit] = useState(false);
  const navigate = useNavigate();

  const { id } = useParams();
  console.log("id", id);
  useEffect(() => {
    if (!id) {
      setIsEdit(false);
      setFName(""), setFEmail("");
    } else {
      setIsEdit(true);
      fetchSingalData(id);
    }
  }, [id]);

  const fetchSingalData = async (id: string) => {
    try {
      const docRef = doc(db, "Todo", id);
      const docSnap = await getDoc(docRef);
      const data = docSnap.data();
      if (data) {
        setFName(data.fName);
        setFEmail(data.fEmail);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const handleEdit = async (e: any) => {
    e.preventDefault();
    if (!id) return;
    try {
      await updateDoc(doc(db, "Todo", id), {
        fName: fName,
        fEmail: fEmail,
      });
      setFName(""), setFEmail(""), navigate("/");
    } catch (error) {
      console.log(error);
    }
  };
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
      setFName("");
      setFEmail("");
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };
  const handleFormSubmit = (e: React.FormEvent) => {
    if (isEdit) {
      handleEdit(e);
    } else {
      handleSubmit(e);
    }
  };
  return (
    <div>
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="w-full max-w-md p-8 space-y-4 bg-white rounded-lg shadow-md">
          <h2 className="text-2xl font-bold text-center text-gray-800">
            {isEdit ? "Update a card" : "Add a card"}
          </h2>
          <form onSubmit={handleFormSubmit}>
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

            <button className=" flex justify-center items-center mt-2 bg-blue-700 text-white p-1 rounded ">
              {isEdit ? "Update " : "Add"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
