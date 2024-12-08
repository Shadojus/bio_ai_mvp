// frontend/convex/biometrics.ts

import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

// Get latest biometric data
export const getLatestBiometrics = query({
  args: { userId: v.string() },
  handler: async (ctx, { userId }) => {
    const latest = await ctx.db
      .query("biometrics")
      .filter((q) => q.eq(q.field("userId"), userId))
      .order("desc")
      .first();

    // If no data exists yet, return dummy data
    if (!latest) {
      return {
        userId,
        timestamp: Date.now(),
        heartRate: 75,
        stressLevel: 50,
        activityLevel: 30,
        focusScore: 80,
        energyLevel: 70,
        lastProcessed: true,
      };
    }

    return latest;
  },
});

// Generate biometric data
export const generateBiometricData = mutation({
  args: { userId: v.string() },
  handler: async (ctx, { userId }) => {
    const data = {
      userId,
      timestamp: Date.now(),
      heartRate: 60 + Math.random() * 40, // 60-100 bpm
      stressLevel: Math.random() * 100,
      activityLevel: Math.random() * 100,
      focusScore: Math.random() * 100,
      energyLevel: Math.random() * 100,
      lastProcessed: false,
    };

    const id = await ctx.db.insert("biometrics", data);
    return { ...data, _id: id };
  },
});

export const processBiometricData = mutation({
  args: { userId: v.string() },
  handler: async (ctx, { userId }) => {
    const latestData = await ctx.db
      .query("biometrics")
      .filter((q) => q.eq(q.field("userId"), userId))
      .order("desc")
      .first();

    if (!latestData || latestData.lastProcessed) {
      return; // Data already processed or no new data
    }

    const currentState = await ctx.db
      .query("stateTransitions")
      .order("desc")
      .first();

    // Default to a known state if no transitions exist yet
    const currentStateName = currentState?.toState || "Deep Blue";

    const thresholds = await ctx.db
      .query("biometricThresholds")
      .filter((q) => q.eq(q.field("stateId"), currentStateName))
      .first();

    // Default thresholds if none are defined for the current state
    const {
      minHeartRate = 50,
      maxHeartRate = 120,
      maxStressLevel = 80,
      minFocusScore = 60,
      minEnergyLevel = 30,
    } = thresholds || {};

    let newState = null;
    if (
      latestData.heartRate < minHeartRate ||
      latestData.heartRate > maxHeartRate
    ) {
      newState = "Red";
    } else if (latestData.stressLevel > maxStressLevel) {
      newState = "Green";
    } else if (latestData.focusScore < minFocusScore) {
      newState = "Deep Blue";
    } else if (latestData.energyLevel < minEnergyLevel) {
      newState = "Green";
    }

    if (newState) {
      await ctx.db.insert("stateTransitions", {
        fromState: currentStateName,
        toState: newState,
        reason: "Biometric trigger",
        timestamp: Date.now(),
      });
    }

    await ctx.db.patch(latestData._id, { lastProcessed: true });
  },
});
