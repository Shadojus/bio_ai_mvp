// frontend/convex/states.ts

import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

interface StateDefinition {
  title: string;
  content: string;
  description: string;
  applications: string[];
  metrics: {
    transitionEfficiency: number;
    userSatisfaction: number;
  };
}

// Complete state definitions based on the Color-Coded Framework
const STATE_DEFINITIONS: Record<string, StateDefinition> = {
  "Deep Blue": {
    title: "Deep Blue",
    content: "High cognitive tasks, strategic planning, and intense focus.",
    description: "Optimized for complex problem-solving and strategic work.",
    applications: [
      "Planning and analysis tasks",
      "Collaboration between User, GPT and Claude for decision-making",
    ],
    metrics: {
      transitionEfficiency: 95,
      userSatisfaction: 90,
    },
  },
  Green: {
    title: "Green",
    content: "Biological health, stress recovery, and energy restoration.",
    description: "Focus on physical wellbeing and recovery.",
    applications: [
      "Physical activity and rest routines",
      "Stress management protocols",
    ],
    metrics: {
      transitionEfficiency: 95,
      userSatisfaction: 90,
    },
  },
  Purple: {
    title: "Purple",
    content: "Knowledge acquisition, creative thinking, and reflective tasks.",
    description: "Optimized for learning and creative work.",
    applications: [
      "Tutorials and educational content",
      "AI-assisted knowledge synthesis",
    ],
    metrics: {
      transitionEfficiency: 95,
      userSatisfaction: 90,
    },
  },
  Orange: {
    title: "Orange",
    content: "Social engagement, communication, and teamwork.",
    description: "Focused on collaboration and social interaction.",
    applications: [
      "Stakeholder meetings",
      "Social media and content generation",
    ],
    metrics: {
      transitionEfficiency: 95,
      userSatisfaction: 90,
    },
  },
  Gray: {
    title: "Gray",
    content: "System health, baseline checks, and environmental optimization.",
    description: "System maintenance and optimization.",
    applications: ["Sensor maintenance", "System diagnostics"],
    metrics: {
      transitionEfficiency: 95,
      userSatisfaction: 90,
    },
  },
  Red: {
    title: "Red",
    content: "High-priority alerts and critical interventions.",
    description: "Emergency response and critical situations.",
    applications: ["Security breaches", "Health-related emergencies"],
    metrics: {
      transitionEfficiency: 95,
      userSatisfaction: 90,
    },
  },
  Customization: {
    title: "Customization",
    content: "User-defined states for personalized interactions.",
    description: "Personalized state configurations.",
    applications: [
      "Real-time adjustments to workflows",
      "User preference management",
    ],
    metrics: {
      transitionEfficiency: 95,
      userSatisfaction: 90,
    },
  },
};

export const getAllStates = query({
  args: {},
  handler: async (ctx) => {
    const states = await ctx.db.query("states").collect();
    return states.length > 0 ? states : null;
  },
});

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

    return {
      ...state,
      ...STATE_DEFINITIONS[state.title],
    };
  },
});

export const initializeStates = mutation({
  args: {},
  handler: async (ctx) => {
    const existingStates = await ctx.db.query("states").collect();
    if (existingStates.length > 0) {
      return { status: "States already initialized" };
    }

    // Insert all states from STATE_DEFINITIONS
    for (const state of Object.values(STATE_DEFINITIONS)) {
      await ctx.db.insert("states", {
        title: state.title,
        content: state.content,
        authorId: "system",
        createdAt: Date.now(),
      });
    }

    return { status: "States initialized successfully" };
  },
});

export const transitionState = mutation({
  args: {
    fromState: v.string(),
    toState: v.string(),
    reason: v.string(),
  },
  handler: async (ctx, { fromState, toState, reason }) => {
    // Validate states exist
    const targetState = await ctx.db
      .query("states")
      .filter((q) => q.eq(q.field("title"), toState))
      .first();

    if (!targetState) {
      throw new Error(`Invalid target state: ${toState}`);
    }

    // Log transition
    await ctx.db.insert("stateTransitions", {
      fromState,
      toState,
      reason,
      timestamp: Date.now(),
    });

    return { status: "success", newState: toState };
  },
});
