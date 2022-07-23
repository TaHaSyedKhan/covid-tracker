import { useState, useEffect } from "react";
import { fetchDailyData } from "../../api";
import { Line} from "react-chartjs-2";
import styles from './Chart.module.css';

import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
  } from 'chart.js'
  
  ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
  )

const Chart = () => {
    const [dailyData, setDailyData] = useState([]);

    useEffect(() => {
        const fetchAPI = async () => {
            setDailyData(await fetchDailyData());
        }

        fetchAPI();
    });

    const lineChart = dailyData.length ? (
        <Line
        
          data={{
            labels: dailyData.map(({ date }) => date),
            datasets: [
              {
                data: dailyData.map((data) => data.confirmed),
                label: "Infected",
                borderColor: "rgb(0, 255, 0, 0.5)",
                fill: true,
              },
              {
                data: dailyData.map((data) => data.deaths),
                label: "Deaths",
                borderColor: "rgb(255, 0, 0, 0.5)",
                fill: true,
              },
            ],
          }}
        />
      ) : null;
    
    
      return (
        <div className={styles.container}>
          {lineChart}
        </div>
      );
};
     

export default Chart;