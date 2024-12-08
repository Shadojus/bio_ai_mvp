// Path: frontend/src/app/components/Timeline.js

function Timeline() {
  const states = [
    { name: "Relaxed", color: "green", timestamp: "10:00 AM" },
    { name: "Focused", color: "blue", timestamp: "10:30 AM" },
    { name: "Stressed", color: "red", timestamp: "11:00 AM" },
  ];

  return `
    <div style="margin-top: 20px;">
      ${states
        .map(
          (state) => `
        <div style="display: flex; align-items: center; margin-bottom: 10px; padding: 10px; background: white; border-radius: 8px; box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);">
          <div style="width: 20px; height: 20px; border-radius: 50%; background: ${state.color}; margin-right: 10px;"></div>
          <div>
            <h3 style="font-size: 16px; font-weight: bold; color: black;">${state.name}</h3>
            <p style="font-size: 12px; color: gray;">${state.timestamp}</p>
          </div>
        </div>
      `
        )
        .join("")}
    </div>
  `;
}

export default Timeline;
