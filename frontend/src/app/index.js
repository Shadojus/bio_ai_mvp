// Path: frontend/src/app/index.js

import StateHeader from "./components/StateHeader.js";
import Timeline from "./components/Timeline.js";
import BiometricChart from "./components/BiometricChart.js";

function App() {
  const app = document.getElementById("app");

  app.innerHTML = `
    <div style="padding: 20px; background: #f7fafc; font-family: Arial, sans-serif; min-height: 100vh;">
      ${StateHeader()}
      ${Timeline()}
      ${BiometricChart()}
    </div>
  `;
}

App();
