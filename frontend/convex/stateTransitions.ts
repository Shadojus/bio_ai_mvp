// /frontend/convex/stateTransitions.ts

import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const getCurrentState = query({
  args: {},
  handler: async (ctx) => {
    const state = await ctx.db.query("stateTransitions").order("desc").first();
    return state || { toState: "Gray" };
  },
});

export const transitionState = mutation({
  args: {
    fromState: v.string(),
    toState: v.string(),
    reason: v.string(),
    priority: v.number(),
  },
  handler: async (ctx, args) => {
    const id = await ctx.db.insert("stateTransitions", {
      ...args,
      timestamp: Date.now(),
    });

    return { id, status: "success" };
  },
});

export const getStateHistory = query({
  args: {
    limit: v.optional(v.number()),
  },
  handler: async (ctx, { limit = 10 }) => {
    return await ctx.db.query("stateTransitions").order("desc").take(limit);
  },
});
