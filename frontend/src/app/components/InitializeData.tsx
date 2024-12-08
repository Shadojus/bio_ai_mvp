// frontend/src/app/components/InitializeData.tsx
"use client";

import { useEffect } from "react";
import { useMutation } from "convex/react";
import { api } from "../../../convex/_generated/api";

export default function InitializeData() {
  const updateThresholds = useMutation(
    api.biometricThresholds.updateThresholds
  );

  useEffect(() => {
    const initialize = async () => {
      try {
        const thresholds = {
          minHeartRate: 60,
          maxHeartRate: 100,
          minStressLevel: 10,
          maxStressLevel: 50,
          minActivityLevel: 20,
          maxActivityLevel: 70,
          minFocusScore: 80,
          maxFocusScore: 100,
          minEnergyLevel: 60,
          maxEnergyLevel: 100,
          isActive: true,
          lastUpdated: Date.now(), // Ensure the field is included
        };

        const result = await updateThresholds({
          state: "Deep Blue", // Replace with the appropriate state
          thresholds,
        });

        console.log("Initialization result:", result);
      } catch (error) {
        console.error("Initialization failed:", error);
      }
    };

    initialize();
  }, [updateThresholds]);

  return null;
}
