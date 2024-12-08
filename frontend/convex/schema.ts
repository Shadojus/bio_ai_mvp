// /frontend/convex/schema.ts

import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  users: defineTable({
    name: v.string(),
    email: v.string(),
    createdAt: v.number(),
  }),
  states: defineTable({
    title: v.string(),
    content: v.string(),
    authorId: v.string(),
    createdAt: v.number(),
  }),
  stateTransitions: defineTable({
    fromState: v.string(),
    toState: v.string(),
    reason: v.string(),
    timestamp: v.number(),
    priority: v.number(),
  }),
  biometrics: defineTable({
    userId: v.string(),
    timestamp: v.number(),
    heartRate: v.number(),
    stressLevel: v.number(),
    activityLevel: v.number(),
    focusScore: v.number(),
    energyLevel: v.number(),
    lastProcessed: v.boolean(),
  }),
  biometricThresholds: defineTable({
    stateId: v.string(),
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
    lastUpdated: v.number(),
  }),
});
