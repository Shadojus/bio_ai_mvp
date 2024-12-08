// /frontend/convex/stateManager.ts

import { query, mutation } from "./_generated/server";
import { v } from "convex/values";

const STATE_PRIORITIES = {
  Red: 1, // Emergency - highest priority
  Gray: 2, // System maintenance
  DeepBlue: 3, // Focus state
  Green: 4, // Recovery state
  Purple: 5, // Learning state
  Orange: 6, // Collaboration state
  Custom: 7, // User-defined state
} as const;

type StateName = keyof typeof STATE_PRIORITIES;

// Helper function to validate state transitions
function validateStateTransition(
  currentState: StateName,
  targetState: string
): { eligible: boolean; reason: string } {
  if (!(targetState in STATE_PRIORITIES)) {
    return {
      eligible: false,
      reason: `Invalid state: ${targetState}`,
    };
  }

  // Red state can always be activated
  if (targetState === "Red") {
    return {
      eligible: true,
      reason: "Emergency state transition always allowed",
    };
  }

  // Can't leave Red state without force override
  if (currentState === "Red") {
    return {
      eligible: false,
      reason: "Cannot transition from emergency state without override",
    };
  }

  const currentPriority = STATE_PRIORITIES[currentState];
  const targetPriority = STATE_PRIORITIES[targetState as StateName];

  return {
    eligible: targetPriority >= currentPriority,
    reason:
      targetPriority >= currentPriority
        ? "Transition allowed"
        : `Cannot transition to lower priority state (${targetState}) from higher priority state (${currentState})`,
  };
}

export const getCurrentState = query({
  args: {},
  handler: async (ctx) => {
    const state = await ctx.db.query("stateTransitions").order("desc").first();

    return state ?? { toState: "Gray" as StateName };
  },
});

export const checkStateTransitionEligibility = query({
  args: {
    targetState: v.string(),
  },
  handler: async (ctx, { targetState }) => {
    const currentState = await ctx.db
      .query("stateTransitions")
      .order("desc")
      .first();

    const currentStateName = (currentState?.toState ?? "Gray") as StateName;
    return validateStateTransition(currentStateName, targetState);
  },
});

export const transitionState = mutation({
  args: {
    toState: v.string(),
    reason: v.string(),
    force: v.optional(v.boolean()),
  },
  handler: async (ctx, { toState, reason, force = false }) => {
    // Get current state
    const currentState = await ctx.db
      .query("stateTransitions")
      .order("desc")
      .first();

    const fromState = (currentState?.toState ?? "Gray") as StateName;

    // Check eligibility unless force is true
    if (!force) {
      const validation = validateStateTransition(fromState, toState);
      if (!validation.eligible) {
        return {
          success: false,
          message: validation.reason,
        };
      }
    }

    // Perform the transition
    const id = await ctx.db.insert("stateTransitions", {
      fromState,
      toState: toState as StateName,
      reason,
      timestamp: Date.now(),
      priority: STATE_PRIORITIES[toState as StateName],
    });

    return {
      success: true,
      id,
      message: `Transitioned from ${fromState} to ${toState}`,
      state: {
        fromState,
        toState: toState as StateName,
        reason,
        priority: STATE_PRIORITIES[toState as StateName],
      },
    };
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
