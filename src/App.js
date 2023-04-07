import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Form from "./Form";
import Students from "./Students";
import SingleStudent from "./SingleStudent";
import Update from "./Update";





const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Form />} />
        <Route path="/students" element={<Students />} />
        <Route path="/SingleStudent/:studentId" element={<SingleStudent />} />
        <Route path="/Update/:studentId" element={<Update />} />
              </Routes>
    </BrowserRouter>
  )
}

export default App