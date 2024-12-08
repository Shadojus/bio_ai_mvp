// Path: frontend/src/app/components/StateHeader.js

function StateHeader() {
  const state = "Deep Blue";
  const color = "blue";

  return `
    <div style="display: flex; align-items: center; justify-content: center; width: 100%; height: 80px; background: linear-gradient(to right, ${color} 50%, light${color} 50%); border-radius: 8px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
      <h1 style="font-size: 24px; font-weight: bold; color: white;">${state}</h1>
    </div>
  `;
}

export default StateHeader;
