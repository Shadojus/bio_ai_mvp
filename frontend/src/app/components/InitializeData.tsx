// frontend/src/app/components/InitializeData.tsx
"use client";

import { useEffect } from "react";
import { useMutation } from "convex/react";
import { api } from "../../../convex/_generated/api";

export default function InitializeData() {
  const initThresholds = useMutation(
    api.tresholds.initializeBiometricThresholds
  );

  useEffect(() => {
    const initialize = async () => {
      try {
        const result = await initThresholds();
        console.log("Initialization result:", result);
      } catch (error) {
        console.error("Initialization failed:", error);
      }
    };

    initialize();
  }, [initThresholds]);

  return null;
}
