import { useNavigate } from "react-router-dom";
import { scroller } from "react-scroll";

const useSectionNavigation = () => {
  const navigate = useNavigate();

  const navigateToSection = (sectionId) => {
    const isSamePage = window.location.pathname === "/";

    if (isSamePage) {
      scroller.scrollTo(sectionId, {
        duration: 500,
        smooth: true,
        offset: -50,
      });
    } else {
      navigate(`/?scrollTo=${sectionId}`);
    }
  };

  return navigateToSection;
};

export default useSectionNavigation;
