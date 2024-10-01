import * as React from 'react';
import { BarChart } from '@mui/x-charts/BarChart';
import { axisClasses } from '@mui/x-charts';

const chartSetting = {
  yAxis: [
    {
      label: 'total reps',
    },
  ],
  width: 500,
  height: 300,
  sx: {
    [`.${axisClasses.left} .${axisClasses.label}`]: {
      transform: 'translate(-5px, 0)',
    },
  },
};

export default function ProgressDiagram({ exerciseDataPoints }) {
  
  const dataset = {
    data: exerciseDataPoints.map(({ weekNumber, dataPoints }) => ({
      weekNumber: weekNumber.toString(), // Ensure weekNumber is converted to a string
      dataPoints: dataPoints
    }))
  };
  // const dummyData = [
  //   { weekNumber: 'Week 1', dataPoints: 10 },
  //   { weekNumber: 'Week 2', dataPoints: 15 },
  //   { weekNumber: 'Week 3', dataPoints: 12 },
  //   { weekNumber: 'Week 4', dataPoints: 18 },
  //   { weekNumber: 'Week 5', dataPoints: 20 },
  // ];

  return (
    <div className='pdiagram'>
    <BarChart
      dataset={dataset.data}
      xAxis={[{ scaleType: 'band', dataKey: 'weekNumber' }]}
      series={[{ dataKey: 'dataPoints', color: '#bb4444' }]}
      {...chartSetting}
    />
    </div>
  );
}
