import {Bar, BarChart, CartesianGrid, Legend, Rectangle, ResponsiveContainer, Tooltip, XAxis, YAxis} from 'recharts';
import {useMemo} from "react";

const BarChartTruck = ({data}) => {
    const graphData = useMemo(()=>{
        let gh = []
        if(data?.tours){
            data?.tours?.forEach((tour)=>{
                let obj = {name: tour?.vehicleId, distance: tour?.statistic?.distance, duration:tour?.statistic?.duration}
                gh.push(obj)
            })
        }
        return gh
    }, [data])


    return (
        <ResponsiveContainer
            width={500}
            height={300} >
            <BarChart
                data={graphData}
                margin={{
                    top: 5,
                    right: 30,
                    left: 20,
                    bottom: 5,
                }}
            >
                <CartesianGrid strokeDasharray="3 3"/>
                <XAxis dataKey="name"/>
                <YAxis/>
                <Tooltip/>
                <Legend/>
                <Bar dataKey="distance" fill="#8884d8" activeBar={<Rectangle fill="pink" stroke="blue"/>}/>
                <Bar dataKey="duration" fill="#82ca9d" activeBar={<Rectangle fill="gold" stroke="purple"/>}/>
            </BarChart>
        </ResponsiveContainer>
    );
}

export default BarChartTruck;