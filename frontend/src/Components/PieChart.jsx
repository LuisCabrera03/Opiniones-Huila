import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';
import { Paper } from '@mui/material';

// Registrar ArcElement y otros necesarios
ChartJS.register(ArcElement, Tooltip, Legend);

const pieData = {
  labels: ['América', 'Asia', 'Europa', 'África'],
  datasets: [
    {
      label: '# of Votes',
      data: [300, 50, 100, 50],
      backgroundColor: [
        'rgba(255, 99, 132, 0.2)',
        'rgba(54, 162, 235, 0.2)',
        'rgba(255, 206, 86, 0.2)',
        'rgba(75, 192, 192, 0.2)',
      ],
      borderColor: [
        'rgba(255, 99, 132, 1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)',
        'rgba(75, 192, 192, 1)',
      ],
      borderWidth: 1,
    },
  ],
};

export default function PieChart() {
  return (
    <Paper elevation={3} sx={{ padding: '1.5rem' }}>
      <Pie data={pieData} />
    </Paper>
  );
}
