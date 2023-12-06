import "./App.css";
import React from "react";
import { Amplify } from "aws-amplify";
import awsExports from "./aws-exports";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import { RootLayout, ErrorPage, HomePage, QuizPage } from "./Pages";
Amplify.configure(awsExports);

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    id: "root",
    children: [
      { index: true, element: <HomePage /> },
      { path: "/quiz", element: <QuizPage /> },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
