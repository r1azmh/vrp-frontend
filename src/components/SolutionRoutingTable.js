'use client';

import {Table} from 'flowbite-react';
import { humanizeDateTime } from './functions';

export function SolutionRoutingTable(props) {
    return (
        <div className="overflow-x-auto">
            <Table hoverable>
                <Table.Head>
                    <Table.HeadCell>VEHICLE ID</Table.HeadCell>
                    <Table.HeadCell>TYPE</Table.HeadCell>
                    <Table.HeadCell>JOB ID</Table.HeadCell>
                    <Table.HeadCell>LOCATION</Table.HeadCell>
                    <Table.HeadCell>ARRIVAL(Time)</Table.HeadCell>
                    <Table.HeadCell>DEPARTURE(Time)</Table.HeadCell>
                    <Table.HeadCell>LOAD</Table.HeadCell>
                    <Table.HeadCell>DISTANCE</Table.HeadCell>
                </Table.Head>
                <Table.Body className="divide-y">
                    {
                        props?.tours?.map((tour, index) => <Tour tour={tour} colorIndex={index}/>)
                    }
                </Table.Body>
            </Table>
        </div>
    );
}

const COLOR = ["#ffffff", "#edf2f4"]
function Tour(props) {
    const randomColor = COLOR[props?.colorIndex % 2]
    return (
        props?.tour?.stops?.map((stop) => stop?.activities?.map((act)=><Table.Row style={{backgroundColor: randomColor}} className="bg-white dark:border-gray-700 dark:bg-gray-800">
                <Table.Cell className="whitespace-nowrap font-medium dark:text-white" >
                    {props?.tour?.vehicleId}
                </Table.Cell>
                <Table.Cell>{act?.type}</Table.Cell>
                <Table.Cell>{act?.jobId}</Table.Cell>
                <Table.Cell>{stop?.location?.lat?.toFixed(2)}</Table.Cell>
                <Table.Cell>{humanizeDateTime(act?.time?.start ?? stop?.time?.arrival)}</Table.Cell>
                <Table.Cell>{humanizeDateTime(act?.time?.end ??  stop?.time?.departure)}</Table.Cell>
                <Table.Cell>{stop?.load?.[0]}</Table.Cell>
                <Table.Cell>{stop?.distance}</Table.Cell>
            </Table.Row>)

        )
    )
}
