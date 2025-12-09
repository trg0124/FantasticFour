import { useNavigate } from "react-router-dom";
import { PageContainer } from "../components/SharedLayout";
import "../styles/resources.css";
export default function Resources() {
  const navigate = useNavigate();

   return (
    <PageContainer title="Resources">
      <button className="resource-button" onClick={() => navigate("/privacy-policy")}>
        Privacy Policy
      </button>

       <button className="resource-button" onClick={() => navigate("/terms-conditions")}>
        Terms & Conditions
      </button>

            <button className="resource-button" onClick={() => navigate("/help-center")}>
        Help Center
      </button>

            <button className="resource-button" onClick={() => navigate("/accessibility")}>
        Accessibility
      </button>

            <button className="resource-button" onClick={() => navigate("/faqs")}>
        FAQs
      </button>
    </PageContainer>
  );
}
