// frontend/convex/thresholds.ts

import { mutation } from "./_generated/server";

export const initializeBiometricThresholds = mutation({
  args: {},
  handler: async (ctx) => {
    // Check if thresholds already exist
    const existingThresholds = await ctx.db
      .query("biometricThresholds")
      .collect();
    if (existingThresholds.length > 0) {
      return { status: "Thresholds already initialized" };
    }

    // Define default thresholds
    const thresholds = [
      {
        stateId: "Deep Blue",
        minHeartRate: 60,
        maxHeartRate: 80,
        minStressLevel: 0,
        maxStressLevel: 30,
        minActivityLevel: 20,
        maxActivityLevel: 40,
        minFocusScore: 80,
        minEnergyLevel: 70,
      },
    ];

    // Insert thresholds
    for (const threshold of thresholds) {
      await ctx.db.insert("biometricThresholds", threshold);
    }

    return { status: "Biometric thresholds initialized successfully" };
  },
});
