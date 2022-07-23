import styles from './Cards.module.css';
import CountUp from 'react-countup';

    const Card = ({ data: { confirmed, recovered, deaths, lastUpdate}}) => {
    
    if(!confirmed){
        return 'loading...'
    }

    return (
        <div className={styles.card}>
            <div className={styles.infected}>
                <h3>Infected</h3>
                <h5>
                    <CountUp start={0} end={confirmed.value} duration={2.5} separator="," />
                </h5>
                <h5>{new Date(lastUpdate).toDateString()}</h5>
                <p>Number of active cases of covid-19</p>
            </div>
            <div className={styles.recovered}>
                <h3>Recovered</h3>
                <h5>
                     <CountUp start={0} end={recovered.value} duration={2.5} separator="," />  
                </h5>
                <h5>{new Date(lastUpdate).toDateString()}</h5>
                <p>Number of recoveries from covid-19</p>
            </div>
            <div className={styles.deaths}>
                <h3>Deaths</h3>
                <h5>
                     <CountUp start={0} end={deaths.value} duration={2.5} separator="," />
                </h5>
                <h5>{new Date(lastUpdate).toDateString()}</h5>
                <p>Number of deaths caused by covid-19</p>
            </div>
        </div>
    );
}

export default Card;