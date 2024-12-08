// frontend/convex/states.ts
import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const getStateDetails = query({
  args: { stateName: v.string() },
  handler: async (ctx, { stateName }) => {
    const state = await ctx.db
      .query("states")
      .filter((q) => q.eq(q.field("title"), stateName))
      .first();

    if (!state) {
      throw new Error(`State with name "${stateName}" not found.`);
    }

    return state;
  },
});

export const initializeStates = mutation({
  args: {},
  handler: async (ctx) => {
    // Check if states already exist
    const existingStates = await ctx.db.query("states").collect();
    if (existingStates.length > 0) {
      return { status: "States already initialized" };
    }

    // Initial states based on the Color-Coded Framework
    const states = [
      {
        title: "Deep Blue",
        content: "High cognitive tasks, strategic planning, and intense focus.",
        authorId: "system",
        createdAt: Date.now(),
      },
      {
        title: "Green",
        content: "Biological health, stress recovery, and energy restoration.",
        authorId: "system",
        createdAt: Date.now(),
      },
      {
        title: "Purple",
        content:
          "Knowledge acquisition, creative thinking, and reflective tasks.",
        authorId: "system",
        createdAt: Date.now(),
      },
    ];

    // Insert all states
    for (const state of states) {
      await ctx.db.insert("states", state);
    }

    return { status: "States initialized successfully" };
  },
});
