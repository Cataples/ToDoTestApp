import { useNavigate } from "react-router-dom";

import "../../components/reusables/styles/globalStyles.css";
import { PageContainer } from "../../components/reusables/pageContainer/PageContainer";

export const UnexistingPage = () => {
  const navigate = useNavigate();

  const handleHomepageNavigation = () => navigate("/");

  return (
    <PageContainer>
      <h1>404 - Page Not Found</h1>
      <button className="simple-button" onClick={handleHomepageNavigation}>
        Go to homepage
      </button>
    </PageContainer>
  );
};
