import { mutation } from "./_generated/server";

export const initializeBiometricThresholds = mutation(async ({ db }) => {
  const thresholds = [
    {
      stateId: "Deep Blue",
      minHeartRate: 60,
      maxHeartRate: 100,
      minStressLevel: 20,
      maxStressLevel: 60,
      minActivityLevel: 0,
      maxActivityLevel: 30,
      minFocusScore: 80,
      minEnergyLevel: 70,
    },
    {
      stateId: "Green",
      minHeartRate: 50,
      maxHeartRate: 70,
      minStressLevel: 0,
      maxStressLevel: 30,
      minActivityLevel: 0,
      maxActivityLevel: 20,
      minFocusScore: 50,
      minEnergyLevel: 30,
    },
    {
      stateId: "Purple",
      minHeartRate: 60,
      maxHeartRate: 90,
      minStressLevel: 10,
      maxStressLevel: 50,
      minActivityLevel: 0,
      maxActivityLevel: 30,
      minFocusScore: 60,
      minEnergyLevel: 50,
    },
    {
      stateId: "Orange",
      minHeartRate: 70,
      maxHeartRate: 100,
      minStressLevel: 30,
      maxStressLevel: 70,
      minActivityLevel: 30,
      maxActivityLevel: 70,
      minFocusScore: 60,
      minEnergyLevel: 60,
    },
    {
      stateId: "Gray",
      minHeartRate: 60,
      maxHeartRate: 90,
      minStressLevel: 0,
      maxStressLevel: 40,
      minActivityLevel: 0,
      maxActivityLevel: 30,
      minFocusScore: 60,
      minEnergyLevel: 50,
    },
    {
      stateId: "Red",
      minHeartRate: 100,
      maxHeartRate: 200,
      minStressLevel: 80,
      maxStressLevel: 100,
      minActivityLevel: 0,
      maxActivityLevel: 100,
      minFocusScore: 0,
      minEnergyLevel: 0,
    },
  ];

  for (const threshold of thresholds) {
    await db.insert("biometricThresholds", threshold);
  }
});
