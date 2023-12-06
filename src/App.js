import "./App.css";
import React from "react";
import { Amplify } from "aws-amplify";
import awsExports from "./aws-exports";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import {
  RootLayout,
  ErrorPage,
  HomePage,
  QuizPage,
  ResultsPage,
} from "./Pages";
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
      { path: "/results", element: <ResultsPage /> },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
