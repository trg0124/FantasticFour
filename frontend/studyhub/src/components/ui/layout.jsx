import Navbar from "./navbar";

export default function Layout({ children }) {
  return (
    <>
    <Navbar />
    <div style={{
      minHeight: "100vh",
      background: "#FFF7F7",
      fontFamily: "Poppins"
    }}>
      {children}
    </div>
    </>
  );
}