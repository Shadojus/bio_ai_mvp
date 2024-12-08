// /frontend/convex/functions/states

import { mutation } from "../../_generated/server";
import { v } from "convex/values";

// Update or insert a state into the "posts" table
export const updateState = mutation({
  // Argument validation
  args: {
    stateName: v.string(),
    content: v.string(),
    authorId: v.string(),
    createdAt: v.number(),
  },
  handler: async (ctx, { stateName, content, authorId, createdAt }) => {
    // Check if a state with the given title already exists
    const existingState = await ctx.db
      .query("states")
      .filter((q) => q.eq(q.field("title"), stateName))
      .first();

    if (existingState) {
      // Update the existing state
      await ctx.db.patch(existingState._id, {
        content,
        createdAt,
      });
    } else {
      // Insert a new state
      await ctx.db.insert("states", {
        title: stateName,
        content,
        authorId,
        createdAt,
        lastUpdated: Date.now(),
      });
    }

    return { status: "success" }; // Return success status
  },
});
