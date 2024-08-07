"use client"
import Image from "next/image";
import Create from "./create/page";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Read from "./read/page";
import Navbar from "./header/page";

export default function Home() {
  return (
   <BrowserRouter>
   <Navbar/>
   <Routes>
    <Route  path="/" element={<Read/>}></Route>
    <Route path="/create" element={<Create/>}></Route>
    <Route path="/edit/:id" element={<Create/>}></Route>
   </Routes>
   </BrowserRouter>
  );
}
