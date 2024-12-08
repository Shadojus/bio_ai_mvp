import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  biometricThresholds: defineTable({
    maxActivityLevel: v.float64(),
    maxHeartRate: v.float64(),
    maxStressLevel: v.float64(),
    minActivityLevel: v.float64(),
    minEnergyLevel: v.float64(),
    minFocusScore: v.float64(),
    maxFocusScore: v.float64(),
    minHeartRate: v.float64(),
    maxEnergyLevel: v.float64(),
    minStressLevel: v.float64(),
    stateId: v.string(),
    lastUpdated: v.float64(),
    isActive: v.boolean(),
  }),
  biometrics: defineTable({
    activityLevel: v.float64(),
    energyLevel: v.float64(),
    focusScore: v.float64(),
    heartRate: v.float64(),
    lastProcessed: v.boolean(),
    stressLevel: v.float64(),
    timestamp: v.float64(),
    userId: v.string(),
    lastUpdated: v.float64(),
  }),
  states: defineTable({
    authorId: v.string(),
    content: v.string(),
    createdAt: v.float64(),
    title: v.string(),
    lastUpdated: v.float64(),
  }),
  users: defineTable({
    createdAt: v.float64(),
    email: v.string(),
    name: v.string(),
    lastUpdated: v.float64(),
  }),
  stateTransitions: defineTable({
    fromState: v.string(),
    toState: v.string(),
    reason: v.string(),
    priority: v.number(),
    timestamp: v.number(),
    lastUpdated: v.float64(),
  }),
});
