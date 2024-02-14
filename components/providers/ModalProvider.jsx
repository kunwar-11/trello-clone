"use client";

import { useEffect } from "react";
import { useState } from "react";

const { CardModal } = require("../modals/card-modal");

export const ModalProvider = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }
  return (
    <>
      <CardModal />
    </>
  );
};
