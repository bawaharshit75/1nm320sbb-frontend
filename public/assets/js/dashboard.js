/**
 * overview dashboard: chart.js line chart + bootstrap modal helpers
 */
(function () {
    'use strict';

    const primaryBlue = '#3751FF';
    const mutedGrey = '#DFE0EB';

    function initTrendsChart() {
        const canvas = document.getElementById('trendsChart');
        if (!canvas || typeof Chart === 'undefined') {
            return;
        }

        const labels = Array.from({ length: 23 }, function (_, i) {
            return String(i);
        });

        const yesterday = [
            12, 14, 13, 15, 16, 18, 17, 19, 20, 22, 21, 23, 24, 25, 24, 23, 22, 21, 20, 19, 18, 17, 16
        ];

        const today = [
            10, 12, 14, 16, 18, 20, 22, 24, 26, 28, 30, 32, 34, 38, 36, 34, 32, 30, 28, 26, 24, 22, 20
        ];

        const ctx = canvas.getContext('2d');
        const gradient = ctx.createLinearGradient(0, 0, 0, 320);
        gradient.addColorStop(0, 'rgba(55, 81, 255, 0.35)');
        gradient.addColorStop(1, 'rgba(55, 81, 255, 0)');

        new Chart(canvas, {
            type: 'line',
            data: {
                labels: labels,
                datasets: [
                    {
                        label: 'Today',
                        data: today,
                        borderColor: primaryBlue,
                        backgroundColor: gradient,
                        borderWidth: 2,
                        fill: true,
                        tension: 0.35,
                        pointRadius: 0,
                        pointHoverRadius: 4
                    },
                    {
                        label: 'Yesterday',
                        data: yesterday,
                        borderColor: mutedGrey,
                        backgroundColor: 'transparent',
                        borderWidth: 2,
                        fill: false,
                        tension: 0.35,
                        pointRadius: 0,
                        pointHoverRadius: 4
                    }
                ]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                interaction: {
                    mode: 'index',
                    intersect: false
                },
                plugins: {
                    legend: {
                        display: false
                    },
                    tooltip: {
                        enabled: true
                    }
                },
                scales: {
                    x: {
                        grid: {
                            display: false
                        },
                        ticks: {
                            maxTicksLimit: 12,
                            font: { family: "'Mulish', system-ui, sans-serif", size: 10 },
                            color: '#9FA2B4'
                        }
                    },
                    y: {
                        beginAtZero: true,
                        grid: {
                            color: '#EBECF0'
                        },
                        ticks: {
                            stepSize: 10,
                            font: { family: "'Mulish', system-ui, sans-serif", size: 10 },
                            color: '#9FA2B4'
                        }
                    }
                }
            }
        });
    }

    function initTaskForm() {
        const form = document.getElementById('newTaskForm');
        if (!form) {
            return;
        }

        form.addEventListener('submit', function (e) {
            e.preventDefault();
            const modalEl = document.getElementById('taskModal');
            if (!modalEl || typeof bootstrap === 'undefined') {
                return;
            }
            const modal = bootstrap.Modal.getInstance(modalEl);
            if (modal) {
                modal.hide();
            }
            form.reset();
        });
    }

    document.addEventListener('DOMContentLoaded', function () {
        initTrendsChart();
        initTaskForm();
    });
})();
