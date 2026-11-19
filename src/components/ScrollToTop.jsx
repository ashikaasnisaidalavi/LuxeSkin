import { useLayoutEffect } from "react";
import { useLocation } from "react-router-dom";

function ScrollToTop() {
  const { pathname, hash } = useLocation();

  useLayoutEffect(() => {
    if (hash) {
      const sectionId = hash.substring(1);
      const section = document.getElementById(sectionId);

      if (section) {
        section.scrollIntoView({
          behavior: "instant",
          block: "start",
        });
      }
    } else {
      window.scrollTo(0, 0);
    }
  }, [pathname, hash]);

  return null;
}

export default ScrollToTop;