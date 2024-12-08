import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

// ... (existing code) ...

export const getCurrentState = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query("stateTransitions").order("desc").first();
  },
});
