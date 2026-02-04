// Sleep visualization data and rendering
const sleepData = [
  { day: 'Mon', hours: 7 },
  { day: 'Tue', hours: 6.5 },
  { day: 'Wed', hours: 7.5 },
  { day: 'Thu', hours: 6 },
  { day: 'Fri', hours: 8 },
  { day: 'Sat', hours: 8 },
  { day: 'Sun', hours: 7.5 }
];

function drawSleepChart() {
  const svgContainer = document.getElementById('sleep-chart');
  if (!svgContainer) return;

  const width = 700;
  const height = 400;
  const padding = 60;
  const barWidth = (width - padding * 2) / sleepData.length;
  const maxHours = 10;
  const scale = (height - padding * 2) / maxHours;

  // Create SVG
  const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  svg.setAttribute('width', width);
  svg.setAttribute('height', height);
  svg.setAttribute('viewBox', `0 0 ${width} ${height}`);
  svg.style.border = '1px solid #ccc';
  svg.style.marginTop = '20px';

  // Y-axis label
  const yLabel = document.createElementNS('http://www.w3.org/2000/svg', 'text');
  yLabel.setAttribute('x', 20);
  yLabel.setAttribute('y', 20);
  yLabel.setAttribute('font-size', '14');
  yLabel.setAttribute('fill', '#333');
  yLabel.textContent = 'Hours';
  svg.appendChild(yLabel);

  // Draw axes
  const xAxis = document.createElementNS('http://www.w3.org/2000/svg', 'line');
  xAxis.setAttribute('x1', padding);
  xAxis.setAttribute('y1', height - padding);
  xAxis.setAttribute('x2', width - padding);
  xAxis.setAttribute('y2', height - padding);
  xAxis.setAttribute('stroke', '#333');
  xAxis.setAttribute('stroke-width', '2');
  svg.appendChild(xAxis);

  const yAxis = document.createElementNS('http://www.w3.org/2000/svg', 'line');
  yAxis.setAttribute('x1', padding);
  yAxis.setAttribute('y1', padding);
  yAxis.setAttribute('x2', padding);
  yAxis.setAttribute('y2', height - padding);
  yAxis.setAttribute('stroke', '#333');
  yAxis.setAttribute('stroke-width', '2');
  svg.appendChild(yAxis);

  // Draw Y-axis labels and grid
  for (let i = 0; i <= maxHours; i += 2) {
    const y = height - padding - (i * scale);
    
    // Grid line
    const gridLine = document.createElementNS('http://www.w3.org/2000/svg', 'line');
    gridLine.setAttribute('x1', padding);
    gridLine.setAttribute('y1', y);
    gridLine.setAttribute('x2', width - padding);
    gridLine.setAttribute('y2', y);
    gridLine.setAttribute('stroke', '#eee');
    gridLine.setAttribute('stroke-width', '1');
    svg.appendChild(gridLine);

    // Y-axis label
    const label = document.createElementNS('http://www.w3.org/2000/svg', 'text');
    label.setAttribute('x', padding - 35);
    label.setAttribute('y', y + 5);
    label.setAttribute('font-size', '12');
    label.setAttribute('fill', '#666');
    label.setAttribute('text-anchor', 'end');
    label.textContent = i;
    svg.appendChild(label);
  }

  // Draw bars and labels
  sleepData.forEach((data, index) => {
    const x = padding + index * barWidth + barWidth / 2 - 30;
    const barHeight = data.hours * scale;
    const y = height - padding - barHeight;

    // Bar
    const bar = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
    bar.setAttribute('x', x);
    bar.setAttribute('y', y);
    bar.setAttribute('width', 60);
    bar.setAttribute('height', barHeight);
    bar.setAttribute('fill', '#4CAF50');
    bar.setAttribute('rx', '4');
    svg.appendChild(bar);

    // Value label on bar
    const valueText = document.createElementNS('http://www.w3.org/2000/svg', 'text');
    valueText.setAttribute('x', x + 30);
    valueText.setAttribute('y', y - 5);
    valueText.setAttribute('font-size', '12');
    valueText.setAttribute('fill', '#333');
    valueText.setAttribute('text-anchor', 'middle');
    valueText.setAttribute('font-weight', 'bold');
    valueText.textContent = data.hours + 'h';
    svg.appendChild(valueText);

    // Day label
    const dayLabel = document.createElementNS('http://www.w3.org/2000/svg', 'text');
    dayLabel.setAttribute('x', x + 30);
    dayLabel.setAttribute('y', height - padding + 25);
    dayLabel.setAttribute('font-size', '12');
    dayLabel.setAttribute('fill', '#333');
    dayLabel.setAttribute('text-anchor', 'middle');
    dayLabel.textContent = data.day;
    svg.appendChild(dayLabel);
  });

  // Title
  const title = document.createElementNS('http://www.w3.org/2000/svg', 'text');
  title.setAttribute('x', width / 2);
  title.setAttribute('y', 30);
  title.setAttribute('font-size', '18');
  title.setAttribute('font-weight', 'bold');
  title.setAttribute('fill', '#333');
  title.setAttribute('text-anchor', 'middle');
  title.textContent = 'Sleep Hours per Day of the Week';
  svg.appendChild(title);

  svgContainer.appendChild(svg);
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', drawSleepChart);
} else {
  drawSleepChart();
}
