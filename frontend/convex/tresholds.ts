// /frontend/convex/thresholds.ts

import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const updateThresholds = mutation({
  args: {
    state: v.string(),
    thresholds: v.object({
      minHeartRate: v.number(),
      maxHeartRate: v.number(),
      minStressLevel: v.number(),
      maxStressLevel: v.number(),
      minActivityLevel: v.number(),
      maxActivityLevel: v.number(),
      minFocusScore: v.number(),
      maxFocusScore: v.number(),
      minEnergyLevel: v.number(),
      maxEnergyLevel: v.number(),
    }),
  },
  handler: async (ctx, { state, thresholds }) => {
    await ctx.db.insert("biometricThresholds", {
      stateId: state,
      ...thresholds,
      lastUpdated: Date.now(),
    });

    return {
      status: "success",
      message: `Updated thresholds for ${state} state`,
    };
  },
});

export const STATE_THRESHOLDS = {
  Red: {
    minHeartRate: 100,
    maxHeartRate: 180,
    minStressLevel: 80,
    maxStressLevel: 100,
    minActivityLevel: 0,
    maxActivityLevel: 30,
    minFocusScore: 0,
    maxFocusScore: 50,
    minEnergyLevel: 20,
    maxEnergyLevel: 100,
  },
  DeepBlue: {
    minHeartRate: 60,
    maxHeartRate: 80,
    minStressLevel: 0,
    maxStressLevel: 30,
    minActivityLevel: 20,
    maxActivityLevel: 40,
    minFocusScore: 80,
    maxFocusScore: 100,
    minEnergyLevel: 70,
    maxEnergyLevel: 100,
  },
  Green: {
    minHeartRate: 50,
    maxHeartRate: 70,
    minStressLevel: 0,
    maxStressLevel: 20,
    minActivityLevel: 40,
    maxActivityLevel: 70,
    minFocusScore: 60,
    maxFocusScore: 90,
    minEnergyLevel: 60,
    maxEnergyLevel: 90,
  },
  Purple: {
    minHeartRate: 60,
    maxHeartRate: 85,
    minStressLevel: 10,
    maxStressLevel: 40,
    minActivityLevel: 30,
    maxActivityLevel: 60,
    minFocusScore: 70,
    maxFocusScore: 100,
    minEnergyLevel: 65,
    maxEnergyLevel: 95,
  },
  Orange: {
    minHeartRate: 65,
    maxHeartRate: 90,
    minStressLevel: 20,
    maxStressLevel: 50,
    minActivityLevel: 40,
    maxActivityLevel: 70,
    minFocusScore: 60,
    maxFocusScore: 90,
    minEnergyLevel: 60,
    maxEnergyLevel: 90,
  },
  Gray: {
    minHeartRate: 60,
    maxHeartRate: 100,
    minStressLevel: 0,
    maxStressLevel: 60,
    minActivityLevel: 20,
    maxActivityLevel: 80,
    minFocusScore: 50,
    maxFocusScore: 100,
    minEnergyLevel: 50,
    maxEnergyLevel: 100,
  },
} as const;

export const initializeThresholds = mutation({
  args: {},
  handler: async (ctx) => {
    const existingThresholds = await ctx.db
      .query("biometricThresholds")
      .collect();
    if (existingThresholds.length > 0) {
      return { status: "Thresholds already initialized" };
    }

    for (const [state, thresholds] of Object.entries(STATE_THRESHOLDS)) {
      await ctx.db.insert("biometricThresholds", {
        stateId: state,
        ...thresholds,
        lastUpdated: Date.now(),
      });
    }

    return { status: "Thresholds initialized successfully" };
  },
});

export const getThresholds = query({
  args: { state: v.string() },
  handler: async (ctx, { state }) => {
    return await ctx.db
      .query("biometricThresholds")
      .filter((q) => q.eq(q.field("stateId"), state))
      .first();
  },
});
