import "../styles/global.css";
export function PageContainer({ title, children }) {
  return (
    <div className="page-wrapper">
       <div className="page-card">
         {title && <h1 className="page-title">{title}</h1>}
         {children}
      </div>
    </div>
  );
}

