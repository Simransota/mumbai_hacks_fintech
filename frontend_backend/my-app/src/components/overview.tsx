import * as React from 'react';
import { LineChart } from '@mui/x-charts/LineChart';

const userCreditScores = [400, 300, 200, 278, 189, 239, 349]; // Example credit scores
const averageCreditScores = [240, 139, 980, 390, 480, 380, 430]; // Example average credit scores
const months = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
];

export default function Overview() {
  return (
    <div>
      
      <LineChart
        width={500}
        height={300}
        series={[
          { data: averageCreditScores, label: 'Average Credit Score', color: '#82ca9d' },
          { data: userCreditScores, label: 'Your Credit Score', color: '#8884d8' },
        ]}
        // Assuming credit scores are out of 1000
      />
      <p className="mt-2 text-xs text-white">
        Higher credit scores generally indicate better creditworthiness, which can lead to more favorable loan terms and interest rates.
      </p>
    </div>
  );
}
