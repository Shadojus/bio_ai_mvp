// components/InitializeData.tsx
import { useEffect } from "react";

export default function InitializeData() {
  useEffect(() => {
    async function initialize() {
      try {
        const response = await fetch("/api/initializeData", {
          method: "POST",
        });
        if (!response.ok) {
          throw new Error("Initialization failed.");
        }
        console.log("Biometric thresholds initialized successfully.");
      } catch (error) {
        console.error("Error initializing biometric thresholds:", error);
      }
    }
    initialize();
  }, []);

  return null;
}
