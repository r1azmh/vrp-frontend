import {Bar, BarChart, CartesianGrid, Legend, Rectangle, ResponsiveContainer, Tooltip, XAxis, YAxis} from 'recharts';
import {useMemo} from "react";

const BarChartTruckDetails = ({data}) => {
    const graphData = useMemo(() => {
        let gh = []
        if (data?.tours) {
            data?.tours?.forEach((tour) => {
                let obj = {name: tour?.vehicleId, ...tour?.statistic?.times}
                gh.push(obj)
            })
        }
        return gh
    }, [data])


    return (
        <ResponsiveContainer
            width={'100%'}
            height={300}>
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
                <Bar dataKey="driving" fill="#8884d8" activeBar={<Rectangle fill="pink" stroke="blue"/>}/>
                <Bar dataKey="serving" fill="#82ca9d" activeBar={<Rectangle fill="gold" stroke="purple"/>}/>
                <Bar dataKey="waiting" fill="#82ca9d" activeBar={<Rectangle fill="gold" stroke="purple"/>}/>
                <Bar dataKey="commuting" fill="#82ca9d" activeBar={<Rectangle fill="gold" stroke="purple"/>}/>
                <Bar dataKey="parking" fill="#82ca9d" activeBar={<Rectangle fill="gold" stroke="purple"/>}/>
            </BarChart>
        </ResponsiveContainer>
    );
}

export default BarChartTruckDetails;