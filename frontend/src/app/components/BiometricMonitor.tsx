// frontend/src/components/BiometricMonitor.tsx
"use client";

import React, { useEffect } from "react";
import { useMutation, useQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

export default function BiometricMonitor() {
  const generateData = useMutation(api.biometrics.generateBiometricData);
  const processData = useMutation(api.biometrics.processBiometricData);
  const latestData = useQuery(api.biometrics.getLatestBiometrics, {
    userId: "dummy-user-id",
  });

  useEffect(() => {
    const interval = setInterval(async () => {
      await generateData({ userId: "dummy-user-id" });
      await processData({ userId: "dummy-user-id" }); // Process data after generation
    }, 10000);

    return () => clearInterval(interval);
  }, [generateData, processData]);

  if (!latestData) return <div>Loading biometric data...</div>;

  return (
    <div className="p-6 bg-white rounded-lg shadow-sm">
      <h2 className="text-xl font-bold mb-4">Biometric Monitoring</h2>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div className="p-3 bg-gray-50 rounded">
          <div className="text-sm text-gray-600">Heart Rate</div>
          <div className="text-2xl font-bold">
            {Math.round(latestData.heartRate)} BPM
          </div>
        </div>
        <div className="p-3 bg-gray-50 rounded">
          <div className="text-sm text-gray-600">Stress Level</div>
          <div className="text-2xl font-bold">
            {Math.round(latestData.stressLevel)}%
          </div>
        </div>
        <div className="p-3 bg-gray-50 rounded">
          <div className="text-sm text-gray-600">Focus Score</div>
          <div className="text-2xl font-bold">
            {Math.round(latestData.focusScore)}%
          </div>
        </div>
        <div className="p-3 bg-gray-50 rounded">
          <div className="text-sm text-gray-600">Energy Level</div>
          <div className="text-2xl font-bold">
            {Math.round(latestData.energyLevel)}%
          </div>
        </div>
      </div>

      <div className="h-[200px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={[latestData]}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="timestamp" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="heartRate" stroke="#8884d8" />
            <Line type="monotone" dataKey="stressLevel" stroke="#82ca9d" />
            <Line type="monotone" dataKey="focusScore" stroke="#ffc658" />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
