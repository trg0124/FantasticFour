import Navbar from "./navbar";

export default function Layout({ children }) {
  return (
    <>
      <Navbar />
      <main style={{ padding: "2rem", backgroundColor: "#FFF7F7" }}>
        {children}
      </main>
    </>
  );
}