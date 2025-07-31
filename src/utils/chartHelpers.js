export function formatSimpleBarChart(items = []) {
  return {
    labels: items.map(i => i.title ?? 'N/A'),
    datasets: [
      {
        label: 'Count',
        backgroundColor: items.map(() => randomColor()),
        data: items.map(i => i.count ?? 0),
      }
    ]
  }
}


function randomColor() {
  return `hsl(${Math.floor(Math.random() * 360)}, 70%, 60%)`
}
