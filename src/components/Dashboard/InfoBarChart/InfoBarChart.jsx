import { BarChart } from "@mui/x-charts/BarChart";

const InfoBarChart = () => {
  return (
    <div>
      <h2 >Weekly Workload</h2>
      <BarChart
        xAxis={[
          { data: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"] },
        ]}
        series={[
          { data: [4, 3, 5, 1, 6] },
          { data: [1, 6, 3, 4, 1] },
          { data: [2, 5, 6, 3, 2] },
          { data: [2, 4, 6, 2, 4] },
        ]}
        height={300}
      />
    </div>
  );
};

export default InfoBarChart;
