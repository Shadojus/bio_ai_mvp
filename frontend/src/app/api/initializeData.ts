// File: app/api/initializeData.ts
import { NextApiRequest, NextApiResponse } from "next";
import { initializeBiometricThresholds } from "../../../convex/biometricTresholds";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    try {
      await initializeBiometricThresholds();
      res
        .status(200)
        .json({ message: "Biometric thresholds initialized successfully." });
    } catch (error) {
      console.error("Error initializing biometric thresholds:", error);
      res
        .status(500)
        .json({ message: "Error initializing biometric thresholds." });
    }
  } else {
    res.status(405).json({ message: "Method not allowed. Use POST." });
  }
}
