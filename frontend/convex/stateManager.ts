import { v } from "convex/values";
import { query, mutation } from "./_generated/server";

// Query to get the current state
export const getCurrentState = query({
  args: {},
  handler: async (ctx) => {
    const state = await ctx.db.query("stateTransitions").order("desc").first();
    return state || { toState: "Gray" }; // Default to "Gray" if no state found
  },
});

// Mutation to handle state transitions
export const transitionState = mutation({
  args: {
    fromState: v.string(),
    toState: v.string(),
    reason: v.string(),
    priority: v.number(),
  },
  handler: async (ctx, args) => {
    // Merge args with additional fields
    const data = {
      ...args,
      timestamp: Date.now(), // Add timestamp
      lastUpdated: Date.now(), // Add lastUpdated
    };

    // Insert into the database
    const id = await ctx.db.insert("stateTransitions", data);

    // Return success
    return { id, status: "success" };
  },
});
