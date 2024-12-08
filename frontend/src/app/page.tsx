// frontend/src/app/monitoring/page.tsx
"use client";

import MonitoringDashboard from "./components/MonitoringDashboard";
import BiometricMonitor from "./components/BiometricMonitor";
import InitializeData from "./components/InitializeData";

export default function MonitoringPage() {
  return (
    <div className="space-y-6">
      <InitializeData />
      <MonitoringDashboard />
      <div className="px-6">
        <BiometricMonitor />
      </div>
    </div>
  );
}
