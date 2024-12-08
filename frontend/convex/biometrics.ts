// frontend/convex/biometrics.ts

import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const getLatestBiometrics = query({
  args: { userId: v.string() },
  handler: async (ctx, { userId }) => {
    const latest = await ctx.db
      .query("biometrics")
      .filter((q) => q.eq(q.field("userId"), userId))
      .order("desc")
      .first();

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
        lastUpdated: 5,
      };
    }

    return latest;
  },
});

export const generateBiometricData = mutation({
  args: { userId: v.string() },
  handler: async (ctx, { userId }) => {
    const data = {
      userId,
      timestamp: Date.now(),
      heartRate: 60 + Math.random() * 40,
      stressLevel: Math.random() * 100,
      activityLevel: Math.random() * 100,
      focusScore: Math.random() * 100,
      energyLevel: Math.random() * 100,
      lastProcessed: false,
      lastUpdated: Math.random() * 10,
    };

    const id = await ctx.db.insert("biometrics", data);
    return { ...data, _id: id };
  },
});
