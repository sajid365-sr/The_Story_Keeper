import { useEffect, useState } from "react";

const UseAnimation = (target) => {
  const [visible, setVisible] = useState();
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      const entry = entries[0];
      setVisible(entry.isIntersecting);
    });

    if(target){
      observer.observe(target.current);
    }
  }, [target]);
  return visible;
};

export default UseAnimation;
