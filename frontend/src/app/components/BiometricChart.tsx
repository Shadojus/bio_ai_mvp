// Path: frontend/src/app/components/BiometricChart.js

function BiometricChart() {
  const data = [70, 75, 80, 85, 90];

  return `
    <div style="width: 100%; height: 200px; background: white; border-radius: 8px; padding: 20px; box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);">
      <svg viewBox="0 0 200 100" style="width: 100%; height: 100%;">
        <polyline
          fill="none"
          stroke="blue"
          stroke-width="2"
          points="${data
            .map((val, index) => `${index * 40},${100 - val}`)
            .join(" ")}"
        />
      </svg>
    </div>
  `;
}

export default BiometricChart;
