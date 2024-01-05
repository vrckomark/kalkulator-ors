import { useState } from "react";

export const useHistory = () => {
  const [showOverlay, setShowOverlay] = useState(false);

  const toggleOverlay = () => setShowOverlay(!showOverlay);

  return {
    showOverlay,
    toggleOverlay,
  };
};
