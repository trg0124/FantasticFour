import Navbar from "./navbar";

export default function Layout({ children }) {
  return (
    <>
      <Navbar />
      <main style={{ padding: "2rem" }}>
        {children}
      </main>
    </>
  );
}