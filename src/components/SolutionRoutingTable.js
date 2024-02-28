'use client';

import {Table} from 'flowbite-react';

const tt = [
    {
        "vehicleId": "Truck2",
        "typeId": "Truck2",
        "shiftIndex": 0,
        "stops": [
            {
                "location": {
                    "lat": 61.98029351599637,
                    "lng": 22.287486265947035
                },
                "time": {
                    "arrival": "2023-06-05T00:01:00Z",
                    "departure": "2023-06-05T14:56:12Z"
                },
                "distance": 0,
                "load": [
                    0
                ],
                "activities": [
                    {
                        "jobId": "departure",
                        "type": "departure",
                        "location": null,
                        "time": null,
                        "jobTag": null
                    }
                ]
            },
            {
                "location": {
                    "lat": 62.44569562300121,
                    "lng": 22.21075959562566
                },
                "time": {
                    "arrival": "2023-06-05T16:01:00Z",
                    "departure": "2023-06-05T16:16:00Z"
                },
                "distance": 57945,
                "load": [
                    1
                ],
                "activities": [
                    {
                        "jobId": "Container106",
                        "type": "pickup",
                        "location": null,
                        "time": null,
                        "jobTag": null
                    }
                ]
            },
            {
                "location": {
                    "lat": 62.445933848100665,
                    "lng": 22.210933448859112
                },
                "time": {
                    "arrival": "2023-06-05T16:16:00Z",
                    "departure": "2023-06-05T16:31:00Z"
                },
                "distance": 57945,
                "load": [
                    2
                ],
                "activities": [
                    {
                        "jobId": "Container708",
                        "type": "pickup",
                        "location": null,
                        "time": null,
                        "jobTag": null
                    }
                ]
            },
            {
                "location": {
                    "lat": 62.44581473578822,
                    "lng": 22.21058246366468
                },
                "time": {
                    "arrival": "2023-06-05T16:31:00Z",
                    "departure": "2023-06-05T16:46:00Z"
                },
                "distance": 57945,
                "load": [
                    3
                ],
                "activities": [
                    {
                        "jobId": "Container511",
                        "type": "pickup",
                        "location": null,
                        "time": null,
                        "jobTag": null
                    }
                ]
            },
            {
                "location": {
                    "lat": 61.98029351599637,
                    "lng": 22.287486265947035
                },
                "time": {
                    "arrival": "2023-06-05T17:51:02Z",
                    "departure": "2023-06-05T17:51:02Z"
                },
                "distance": 115946,
                "load": [
                    0
                ],
                "activities": [
                    {
                        "jobId": "arrival",
                        "type": "arrival",
                        "location": null,
                        "time": null,
                        "jobTag": null
                    }
                ]
            }
        ],
        "statistic": {
            "cost": 249.37533682999998,
            "distance": 115946,
            "duration": 10490,
            "times": {
                "driving": 7790,
                "serving": 2700,
                "waiting": 0,
                "commuting": 0,
                "parking": 0
            }
        }
    },
    {
        "vehicleId": "Truck5",
        "typeId": "Truck5",
        "shiftIndex": 0,
        "stops": [
            {
                "location": {
                    "lat": 61.98045695246105,
                    "lng": 22.28805250437794
                },
                "time": {
                    "arrival": "2023-06-05T00:01:00Z",
                    "departure": "2023-06-05T13:39:10Z"
                },
                "distance": 0,
                "load": [
                    0
                ],
                "activities": [
                    {
                        "jobId": "departure",
                        "type": "departure",
                        "location": null,
                        "time": null,
                        "jobTag": null
                    }
                ]
            },
            {
                "location": {
                    "lat": 62.84209272301874,
                    "lng": 22.959454027683385
                },
                "time": {
                    "arrival": "2023-06-05T15:43:03Z",
                    "departure": "2023-06-05T15:58:03Z"
                },
                "distance": 116170,
                "load": [
                    1
                ],
                "activities": [
                    {
                        "jobId": "Container631",
                        "type": "pickup",
                        "location": null,
                        "time": null,
                        "jobTag": null
                    }
                ]
            },
            {
                "location": {
                    "lat": 62.8419294857303,
                    "lng": 22.959714816590857
                },
                "time": {
                    "arrival": "2023-06-05T15:58:04Z",
                    "departure": "2023-06-05T16:13:04Z"
                },
                "distance": 116178,
                "load": [
                    2
                ],
                "activities": [
                    {
                        "jobId": "Container410",
                        "type": "pickup",
                        "location": null,
                        "time": null,
                        "jobTag": null
                    }
                ]
            },
            {
                "location": {
                    "lat": 62.8423473720002,
                    "lng": 22.95992599684018
                },
                "time": {
                    "arrival": "2023-06-05T16:13:09Z",
                    "departure": "2023-06-05T16:28:09Z"
                },
                "distance": 116209,
                "load": [
                    3
                ],
                "activities": [
                    {
                        "jobId": "Container648",
                        "type": "pickup",
                        "location": null,
                        "time": null,
                        "jobTag": null
                    }
                ]
            },
            {
                "location": {
                    "lat": 61.98045695246105,
                    "lng": 22.28805250437794
                },
                "time": {
                    "arrival": "2023-06-05T18:33:18Z",
                    "departure": "2023-06-05T18:33:18Z"
                },
                "distance": 233552,
                "load": [
                    0
                ],
                "activities": [
                    {
                        "jobId": "arrival",
                        "type": "arrival",
                        "location": null,
                        "time": null,
                        "jobTag": null
                    }
                ]
            }
        ],
        "statistic": {
            "cost": 496.517339216,
            "distance": 233552,
            "duration": 17648,
            "times": {
                "driving": 14948,
                "serving": 2700,
                "waiting": 0,
                "commuting": 0,
                "parking": 0
            }
        }
    },
    {
        "vehicleId": "Truck1",
        "typeId": "Truck1",
        "shiftIndex": 0,
        "stops": [
            {
                "location": {
                    "lat": 61.980300236389134,
                    "lng": 22.287830378031305
                },
                "time": {
                    "arrival": "2023-06-05T00:01:00Z",
                    "departure": "2023-06-05T17:08:11Z"
                },
                "distance": 0,
                "load": [
                    0
                ],
                "activities": [
                    {
                        "jobId": "departure",
                        "type": "departure",
                        "location": null,
                        "time": null,
                        "jobTag": null
                    }
                ]
            },
            {
                "location": {
                    "lat": 62.445531841538305,
                    "lng": 22.211479201950432
                },
                "time": {
                    "arrival": "2023-06-05T18:13:00Z",
                    "departure": "2023-06-05T18:28:00Z"
                },
                "distance": 57958,
                "load": [
                    1
                ],
                "activities": [
                    {
                        "jobId": "Container328",
                        "type": "pickup",
                        "location": null,
                        "time": null,
                        "jobTag": null
                    }
                ]
            },
            {
                "location": {
                    "lat": 62.44597024303092,
                    "lng": 22.2116537105257
                },
                "time": {
                    "arrival": "2023-06-05T18:28:36Z",
                    "departure": "2023-06-05T18:43:36Z"
                },
                "distance": 58214,
                "load": [
                    2
                ],
                "activities": [
                    {
                        "jobId": "Container186",
                        "type": "pickup",
                        "location": null,
                        "time": null,
                        "jobTag": null
                    }
                ]
            },
            {
                "location": {
                    "lat": 62.842895839236306,
                    "lng": 22.95919658996152
                },
                "time": {
                    "arrival": "2023-06-05T19:53:30Z",
                    "departure": "2023-06-05T20:08:30Z"
                },
                "distance": 127720,
                "load": [
                    3
                ],
                "activities": [
                    {
                        "jobId": "Container661",
                        "type": "pickup",
                        "location": null,
                        "time": null,
                        "jobTag": null
                    }
                ]
            },
            {
                "location": {
                    "lat": 61.980300236389134,
                    "lng": 22.287830378031305
                },
                "time": {
                    "arrival": "2023-06-05T22:13:12Z",
                    "departure": "2023-06-05T22:13:12Z"
                },
                "distance": 244907,
                "load": [
                    0
                ],
                "activities": [
                    {
                        "jobId": "arrival",
                        "type": "arrival",
                        "location": null,
                        "time": null,
                        "jobTag": null
                    }
                ]
            }
        ],
        "statistic": {
            "cost": 520.315672767,
            "distance": 244907,
            "duration": 18301,
            "times": {
                "driving": 15601,
                "serving": 2700,
                "waiting": 0,
                "commuting": 0,
                "parking": 0
            }
        }
    },
    {
        "vehicleId": "Truck4",
        "typeId": "Truck4",
        "shiftIndex": 0,
        "stops": [
            {
                "location": {
                    "lat": 61.98027031023442,
                    "lng": 22.28808596747195
                },
                "time": {
                    "arrival": "2023-06-05T00:01:00Z",
                    "departure": "2023-06-05T17:46:07Z"
                },
                "distance": 0,
                "load": [
                    0
                ],
                "activities": [
                    {
                        "jobId": "departure",
                        "type": "departure",
                        "location": null,
                        "time": null,
                        "jobTag": null
                    }
                ]
            },
            {
                "location": {
                    "lat": 62.84224290128861,
                    "lng": 22.959368215109457
                },
                "time": {
                    "arrival": "2023-06-05T19:50:00Z",
                    "departure": "2023-06-05T20:05:00Z"
                },
                "distance": 116176,
                "load": [
                    1
                ],
                "activities": [
                    {
                        "jobId": "Container642",
                        "type": "pickup",
                        "location": null,
                        "time": null,
                        "jobTag": null
                    }
                ]
            },
            {
                "location": {
                    "lat": 62.84193601485666,
                    "lng": 22.959454027683385
                },
                "time": {
                    "arrival": "2023-06-05T20:05:00Z",
                    "departure": "2023-06-05T20:20:00Z"
                },
                "distance": 116176,
                "load": [
                    2
                ],
                "activities": [
                    {
                        "jobId": "Container405",
                        "type": "pickup",
                        "location": null,
                        "time": null,
                        "jobTag": null
                    }
                ]
            },
            {
                "location": {
                    "lat": 62.84221025359203,
                    "lng": 22.95911077738756
                },
                "time": {
                    "arrival": "2023-06-05T20:20:02Z",
                    "departure": "2023-06-05T20:35:02Z"
                },
                "distance": 116188,
                "load": [
                    3
                ],
                "activities": [
                    {
                        "jobId": "Container655",
                        "type": "pickup",
                        "location": null,
                        "time": null,
                        "jobTag": null
                    }
                ]
            },
            {
                "location": {
                    "lat": 61.98027031023442,
                    "lng": 22.28808596747195
                },
                "time": {
                    "arrival": "2023-06-05T22:40:02Z",
                    "departure": "2023-06-05T22:40:02Z"
                },
                "distance": 233484,
                "load": [
                    0
                ],
                "activities": [
                    {
                        "jobId": "arrival",
                        "type": "arrival",
                        "location": null,
                        "time": null,
                        "jobTag": null
                    }
                ]
            }
        ],
        "statistic": {
            "cost": 496.359672545,
            "distance": 233484,
            "duration": 17635,
            "times": {
                "driving": 14935,
                "serving": 2700,
                "waiting": 0,
                "commuting": 0,
                "parking": 0
            }
        }
    },
    {
        "vehicleId": "Truck3",
        "typeId": "Truck3",
        "shiftIndex": 0,
        "stops": [
            {
                "location": {
                    "lat": 61.98033079191613,
                    "lng": 22.288086119266257
                },
                "time": {
                    "arrival": "2023-06-05T00:01:00Z",
                    "departure": "2023-06-05T13:50:08Z"
                },
                "distance": 0,
                "load": [
                    0
                ],
                "activities": [
                    {
                        "jobId": "departure",
                        "type": "departure",
                        "location": null,
                        "time": null,
                        "jobTag": null
                    }
                ]
            },
            {
                "location": {
                    "lat": 62.84176134976568,
                    "lng": 22.95955992253563
                },
                "time": {
                    "arrival": "2023-06-05T15:54:03Z",
                    "departure": "2023-06-05T16:09:03Z"
                },
                "distance": 116184,
                "load": [
                    1
                ],
                "activities": [
                    {
                        "jobId": "Container633",
                        "type": "pickup",
                        "location": null,
                        "time": null,
                        "jobTag": null
                    }
                ]
            },
            {
                "location": {
                    "lat": 62.84199478051535,
                    "lng": 22.95923949624849
                },
                "time": {
                    "arrival": "2023-06-05T16:09:11Z",
                    "departure": "2023-06-05T16:24:11Z"
                },
                "distance": 116233,
                "load": [
                    2
                ],
                "activities": [
                    {
                        "jobId": "Container656",
                        "type": "pickup",
                        "location": null,
                        "time": null,
                        "jobTag": null
                    }
                ]
            },
            {
                "location": {
                    "lat": 62.842073134544165,
                    "lng": 22.95919658996152
                },
                "time": {
                    "arrival": "2023-06-05T16:24:11Z",
                    "departure": "2023-06-05T16:39:11Z"
                },
                "distance": 116233,
                "load": [
                    3
                ],
                "activities": [
                    {
                        "jobId": "Container301",
                        "type": "pickup",
                        "location": null,
                        "time": null,
                        "jobTag": null
                    }
                ]
            },
            {
                "location": {
                    "lat": 61.98033079191613,
                    "lng": 22.288086119266257
                },
                "time": {
                    "arrival": "2023-06-05T18:44:11Z",
                    "departure": "2023-06-05T18:44:11Z"
                },
                "distance": 233529,
                "load": [
                    0
                ],
                "activities": [
                    {
                        "jobId": "arrival",
                        "type": "arrival",
                        "location": null,
                        "time": null,
                        "jobTag": null
                    }
                ]
            }
        ],
        "statistic": {
            "cost": 496.4630058810001,
            "distance": 233529,
            "duration": 17643,
            "times": {
                "driving": 14943,
                "serving": 2700,
                "waiting": 0,
                "commuting": 0,
                "parking": 0
            }
        }
    },
    {
        "vehicleId": "Truck6",
        "typeId": "Truck6",
        "shiftIndex": 0,
        "stops": [
            {
                "location": {
                    "lat": 61.98052567646762,
                    "lng": 22.287377460952904
                },
                "time": {
                    "arrival": "2023-06-05T00:01:00Z",
                    "departure": "2023-06-05T10:16:34Z"
                },
                "distance": 0,
                "load": [
                    0
                ],
                "activities": [
                    {
                        "jobId": "departure",
                        "type": "departure",
                        "location": null,
                        "time": null,
                        "jobTag": null
                    }
                ]
            },
            {
                "location": {
                    "lat": 62.44558560797924,
                    "lng": 22.211629820679516
                },
                "time": {
                    "arrival": "2023-06-05T11:21:00Z",
                    "departure": "2023-06-05T11:36:00Z"
                },
                "distance": 57923,
                "load": [
                    1
                ],
                "activities": [
                    {
                        "jobId": "Container134",
                        "type": "pickup",
                        "location": null,
                        "time": null,
                        "jobTag": null
                    }
                ]
            },
            {
                "location": {
                    "lat": 62.44581473578822,
                    "lng": 22.21118782522768
                },
                "time": {
                    "arrival": "2023-06-05T11:36:00Z",
                    "departure": "2023-06-05T11:51:00Z"
                },
                "distance": 57934,
                "load": [
                    2
                ],
                "activities": [
                    {
                        "jobId": "Container530",
                        "type": "pickup",
                        "location": null,
                        "time": null,
                        "jobTag": null
                    }
                ]
            },
            {
                "location": {
                    "lat": 61.98052567646762,
                    "lng": 22.287377460952904
                },
                "time": {
                    "arrival": "2023-06-05T12:55:40Z",
                    "departure": "2023-06-05T12:55:40Z"
                },
                "distance": 115926,
                "load": [
                    0
                ],
                "activities": [
                    {
                        "jobId": "arrival",
                        "type": "arrival",
                        "location": null,
                        "time": null,
                        "jobTag": null
                    }
                ]
            }
        ],
        "statistic": {
            "cost": 247.762003182,
            "distance": 115926,
            "duration": 9546,
            "times": {
                "driving": 7746,
                "serving": 1800,
                "waiting": 0,
                "commuting": 0,
                "parking": 0
            }
        }
    }
]

export function SolutionRoutingTable(props) {
    console.log('tours', props?.tours)
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
                        props?.tours?.map((tour) => <Tour tour={tour}/>)
                    }
                </Table.Body>
            </Table>
        </div>
    );
}

function Tour(props) {
    const randomColor = '#' + Math.floor(Math.random()*16777215).toString(16);
    const className = `whitespace-nowrap font-medium text-[${randomColor}] dark:text-white`
    return (
        props?.tour?.stops?.map((stop) =>
            <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                <Table.Cell className={className}>
                    {props?.tour?.vehicleId}
                </Table.Cell>
                <Table.Cell>{stop?.activities?.[0]?.type}</Table.Cell>
                <Table.Cell>{stop?.activities?.[0]?.jobId}</Table.Cell>
                <Table.Cell>{stop?.location?.lat}</Table.Cell>
                <Table.Cell>{stop?.time?.arrival}</Table.Cell>
                <Table.Cell>{stop?.time?.departure}</Table.Cell>
                <Table.Cell>{stop?.load?.[0]}</Table.Cell>
                <Table.Cell>{stop?.distance}</Table.Cell>
            </Table.Row>)
    )
}
