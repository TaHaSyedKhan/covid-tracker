import { useState, useEffect } from "react";
import { fetchDailyData } from "../../api";
import { Line, Bar} from "react-chartjs-2";
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
    BarElement,
  } from 'chart.js'
  
  ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    BarElement,
    Title,
    Tooltip,
    Legend
  )

const Chart = ({ data: { confirmed, deaths, recovered}, country}) => {
    const [dailyData, setDailyData] = useState([]);

    useEffect(() => {
        const fetchAPI = async () => {
            setDailyData(await fetchDailyData());
        }

        fetchAPI();
    }, []);

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
    
      const barChart = (
        confirmed
          ? (
            <Bar 
              data= {{
                labels: ['Infected', 'Recovered', 'Deaths'],
                datasets: [{
                  label: 'People',
                  backgroundColor: [
                    'rgba(0, 0, 255, 0.5)',
                    'rgba(0, 255, 0, 0.5)',
                    'rgba(255, 0, 0, 0.5)',
                  ],
                  data: [confirmed.value, recovered.value, deaths.value]
                }]
              }}
              options={{
                Legend: { display: false },
                title: { display: true, text: `Current state in ${country}`},
              }}
            />
          ) : null
      );
    
      return (
        <div className={styles.container}>
          {country ? barChart : lineChart}
        </div>
      );
      };
     

export default Chart;