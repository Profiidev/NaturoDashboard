import type { ChartTypeRegistry } from "chart.js";

export const getConfig = (labels: number[], dataPercent: number[], dataAbsolute: number[]) => {
	return {
		type: 'line' as keyof ChartTypeRegistry,
		data: {
			labels: labels,
			datasets: [
				{
					label: 'Usage (%)',
					data: dataPercent,
					fill: false,
					borderColor: 'rgb(142, 27, 224)',
					cubicInterpolationMode: 'monotone',
					tension: 0.4,
					yAxisID: 'y'
				},
				{
					label: 'Usage (MB)',
					data: dataAbsolute,
					fill: false,
					borderColor: 'rgb(75, 192, 192)',
					cubicInterpolationMode: 'monotone',
					tension: 0.4,
					yAxisID: 'y1'
				}
			]
		},
		options: {
			responsive: true,
			plugins: {
				title: {
					display: true,
					text: 'RAM Usage'
				}
			},
			interaction: {
				intersect: false
			},
			scales: {
				x: {
					display: true,
					title: {
						display: true,
						text: 'Time in min'
					}
				},
				y: {
					display: true,
					title: {
						display: true,
						text: 'Usage in %'
					},
					suggestedMin: 0,
					suggestedMax: 1
				},
				y1: {
					display: true,
					position: 'right',
					title: {
						display: true,
						text: 'Usage in MB'
					},
					suggestedMin: 0,
					suggestedMax: 5900
				}
			}
		}
	};
};