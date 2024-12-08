// convex/functions/biometricThresholds.ts

import { mutation } from "./_generated/server";
import { v } from "convex/values";

export const updateThresholds = mutation({
  args: {
    state: v.string(),
    thresholds: v.object({
      minHeartRate: v.optional(v.number()),
      maxHeartRate: v.optional(v.number()),
      minStressLevel: v.optional(v.number()),
      maxStressLevel: v.optional(v.number()),
      minActivityLevel: v.optional(v.number()),
      maxActivityLevel: v.optional(v.number()),
      minFocusScore: v.optional(v.number()),
      maxFocusScore: v.optional(v.number()),
      minEnergyLevel: v.optional(v.number()),
      maxEnergyLevel: v.optional(v.number()),
      isActive: v.optional(v.boolean()),
      lastUpdated: v.optional(v.number()), // Add lastUpdated here
    }),
  },
  handler: async (ctx, { state, thresholds }) => {
    // Define default values for thresholds
    const defaultThresholds = {
      minHeartRate: thresholds.minHeartRate ?? 0,
      maxHeartRate: thresholds.maxHeartRate ?? 200,
      minStressLevel: thresholds.minStressLevel ?? 0,
      maxStressLevel: thresholds.maxStressLevel ?? 100,
      minActivityLevel: thresholds.minActivityLevel ?? 0,
      maxActivityLevel: thresholds.maxActivityLevel ?? 100,
      minFocusScore: thresholds.minFocusScore ?? 0,
      maxFocusScore: thresholds.maxFocusScore ?? 100,
      minEnergyLevel: thresholds.minEnergyLevel ?? 0,
      maxEnergyLevel: thresholds.maxEnergyLevel ?? 100,
      isActive: thresholds.isActive ?? true,
    };

    // Extract lastUpdated or set it to current time
    const lastUpdated = thresholds.lastUpdated ?? Date.now();

    // Merge default values with provided thresholds
    const thresholdsToInsert = {
      ...defaultThresholds,
      ...thresholds,
      lastUpdated, // Ensure lastUpdated is included
    };

    // Insert the thresholds into the database
    await ctx.db.insert("biometricThresholds", {
      stateId: state,
      ...thresholdsToInsert,
    });

    return {
      status: "success",
      message: `Updated thresholds for ${state} state`,
    };
  },
});
