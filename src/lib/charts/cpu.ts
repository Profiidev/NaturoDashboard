import type { ChartTypeRegistry } from "chart.js";

export const getConfig = (labels: number[], data: number[]) => {
  return {
		type: 'line' as keyof ChartTypeRegistry,
		data: {
			labels: labels,
			datasets: [
				{
					label: 'Usage',
					data: data,
					fill: false,
					borderColor: 'rgb(75, 192, 192)',
					cubicInterpolationMode: 'monotone',
					tension: 0.4
				}
			]
		},
		options: {
			responsive: true,
			plugins: {
				title: {
					display: true,
					text: 'CPU Usage'
				}
			},
			interaction: {
				intersect: false
			},
			scales: {
				x: {
					display: true,
					title: {
						display: true
					}
				},
				y: {
					display: true,
					title: {
						display: true,
						text: 'Usage'
					},
					suggestedMin: 0,
					suggestedMax: 100
				}
			}
		}
	};
};