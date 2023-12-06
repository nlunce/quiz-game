import { Outlet } from "react-router-dom";

export default function RootLayout() {
  return (
    <>
      <main
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "80vh",
          padding: "1rem",
        }}
      >
        <Outlet />
      </main>
    </>
  );
}
