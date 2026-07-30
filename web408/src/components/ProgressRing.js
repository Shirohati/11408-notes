export function renderProgressRing(container, rate, color = '#4A90D9', size = 80) {
  const r = (size - 10) / 2
  const circumference = 2 * Math.PI * r
  const offset = circumference * (1 - rate / 100)
  container.innerHTML = `
    <svg width="${size}" height="${size}" class="progress-ring">
      <circle cx="${size/2}" cy="${size/2}" r="${r}" fill="none" stroke="#eee" stroke-width="5"/>
      <circle cx="${size/2}" cy="${size/2}" r="${r}" fill="none" stroke="${color}" stroke-width="5"
        stroke-dasharray="${circumference}" stroke-dashoffset="${offset}"
        stroke-linecap="round" transform="rotate(-90 ${size/2} ${size/2})"/>
      <text x="${size/2}" y="${size/2}" text-anchor="middle" dominant-baseline="central"
        font-size="${size*0.3}px" fill="${color}" font-weight="bold">${Math.round(rate)}%</text>
    </svg>
  `
}
