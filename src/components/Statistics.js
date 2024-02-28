import React, {useEffect, useState} from 'react';
import {Accordion, Button, Card, Flowbite, Kbd, Modal, Table, Tooltip} from "flowbite-react";
import {getSolution, getWork} from "../managers/dashboardManager";
import {TbTruckLoading} from "react-icons/tb";
import {ImLocation} from "react-icons/im";
import BarChartTruck from "./BarChartTruck";
import ResultMap from "./ResultMap";
import BarChartTruckDetails from "./BarChartTruckDetails";
import {SolutionRoutingTable} from "./SolutionRoutingTable";


const Statistics = () => {
    const [openModal, setOpenModal] = useState(false)
    const [modalData, setModalData] = useState()
    const [works, setWorks] = useState([])
    useEffect(() => {
        async function fetchMyAPI() {
            let response = await getWork()
            setWorks(response)
        }

        fetchMyAPI().then()
    }, [])
    return (
        <>
            <ModalComponent openModal={openModal} setOpenModal={setOpenModal} modalData={modalData}/>

            <div className="grid grid-cols-4 gap-4 mt-4">
                {
                    works?.map((work) => <WorkCard key={work?.id} work={work} setModalData={setModalData}
                                                   setOpenModal={setOpenModal}/>)
                }
            </div>
        </>
    );
};


export default Statistics;

const WorkCard = ({work, setOpenModal, setModalData}) => {
    const [isLoading, setIsLoading] = useState(false)
    const handleClick = async () => {
        setIsLoading(true)
        const data = await getSolution(work?.id)
        setModalData(data)
        setIsLoading(false)
        setOpenModal(true)
    }

    return (
        <Card className="max-w-sm">
            <div className="mb-4 flex items-center justify-between">
                <h5 className="text-xl font-bold leading-none text-gray-900 dark:text-white">{work?.name}</h5>
            </div>
            <div className="flow-root">
                <ul className="divide-y divide-gray-200 dark:divide-gray-700">
                    <li className="py-3 sm:py-4">
                        <div className="flex items-center space-x-4">
                            <div className="min-w-0 flex-1">
                                <p className="truncate text-sm font-medium text-gray-900 dark:text-white">Total Jobs</p>
                            </div>
                            <div
                                className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">{work?.total_jobs}</div>
                        </div>
                    </li>
                    <li className="py-3 sm:py-4">
                        <div className="flex items-center space-x-4">
                            <div className="min-w-0 flex-1">
                                <p className="truncate text-sm font-medium text-gray-900 dark:text-white">Total
                                    Vehicle</p>
                            </div>
                            <div
                                className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                                {work?.total_vehicles}
                            </div>
                        </div>
                    </li>
                    <li className="pb-0 pt-3 sm:pt-4">
                        <Button disabled={!work?.total_jobs && !work?.total_vehicles} color="blue" onClick={handleClick}
                                isProcessing={isLoading}>Get Solution</Button>
                    </li>
                </ul>
            </div>
        </Card>
    );
}


function ModalComponent({openModal, setOpenModal, modalData}) {
    console.log('modalData?.solution', modalData?.solution?.tours)
    return (
        <Modal size={'7xl'} show={openModal} onClose={() => setOpenModal(false)}>
            <Modal.Header>Solution for <span className="text-rose-600">{modalData?.work?.name}</span></Modal.Header>
            <Modal.Body>
                <div className="my-4">
                    <SolutionRoutingTable tours={modalData?.solution?.tours}/>
                </div>
                <div className="grid grid-cols-2 gap-4">
                    <SolutionStatistics solution={modalData?.solution?.statistic}/>
                    <DetailsSolution data={modalData}/>
                </div>
                <div className="grid grid-cols-2 gap-4 mt-4">
                    <div>
                        <BarChartTruck data={modalData?.solution}/>
                    </div>
                    <div>
                        <BarChartTruckDetails data={modalData?.solution}/>
                    </div>
                </div>
                <div className="h-screen">
                    {modalData?.solution?.tours?.length > 0 && <ResultMap tours={modalData?.solution?.tours}/>}
                </div>
            </Modal.Body>
        </Modal>
    );
}


function SolutionStatistics({solution}) {
    const flattenObject = (obj, parentKey = "") => {
        return Object.keys(obj).reduce((acc, key) => {
            const newKey = parentKey ? `${key}` : key;
            if (typeof obj[key] === "object" && obj[key] !== null) {
                return {...acc, ...flattenObject(obj[key], newKey)};
            } else {
                return {...acc, [newKey]: obj[key]};
            }
        }, {});
    };
    return <Table striped>
        <Table.Body className="divide-y">
            {
                solution && Object.entries(flattenObject(solution))?.map(([key, value]) => <Table.Row
                    className="bg-white dark:border-gray-700 dark:bg-gray-800">
                    <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                        {key}
                    </Table.Cell>
                    <Table.Cell>{value}</Table.Cell>
                </Table.Row>)
            }

        </Table.Body>
    </Table>
}


const customTheme = {
    "root": {
        "base": "divide-y divide-gray-200  dark:divide-gray-700",
        "flush": {
            "off": "rounded-lg border",
            "on": "border-b"
        }
    },
    "content": {
        "base": "py-5 px-5 "
    },
    "title": {
        "arrow": {
            "base": "h-6 w-6 shrink-0",
            "open": {
                "off": "",
                "on": "rotate-180"
            }
        },
        "base": "flex w-full items-center justify-between py-5 px-5 text-left font-medium text-gray-500 dark:text-gray-400",
        "flush": {
            "off": "hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:hover:bg-gray-800 dark:focus:ring-gray-800",
            "on": "bg-transparent dark:bg-transparent"
        },
        "heading": "",
        "open": {
            "off": "",
            "on": "text-gray-900 bg-gray-100 dark:bg-gray-800 dark:text-white"
        }
    }
}

const DetailsSolution = ({data}) => {
    return (
        <Flowbite theme={{theme: customTheme}}>
            <Accordion>
                <Accordion.Panel>
                    <Accordion.Title>Jobs</Accordion.Title>
                    <Accordion.Content>
                        <div className="flex flex-wrap justify-between gap-2">
                            {
                                data?.jobs?.map((job) => <Tooltip content={<ToolTipDiv data={job}/>}>
                                    <Kbd>{job?.name}</Kbd>
                                </Tooltip>)
                            }

                        </div>
                    </Accordion.Content>
                </Accordion.Panel>
                <Accordion.Panel>
                    <Accordion.Title>Vehicles</Accordion.Title>
                    <Accordion.Content>
                        <div className="flex flex-wrap justify-between gap-2">
                            {
                                data?.vehicles?.map((vehicle) => <Tooltip content={<ToolTipDiv data={vehicle}/>}>
                                    <Kbd>{vehicle?.name}</Kbd>
                                </Tooltip>)
                            }
                        </div>
                    </Accordion.Content>
                </Accordion.Panel>

            </Accordion>
        </Flowbite>
    )
}


const ToolTipDiv = ({data}) => {
    return <div
        className="">
        <ul className="font-normal text-white">
            <li className="flex space-x-2 justify-start items-center hover:shadow"><TbTruckLoading
                className="text-rose-600"/><span>{data?.capacity ?? data?.demand}</span></li>
            <li className="flex space-x-2 justify-start items-center hover:shadow">
                <ImLocation className="text-rose-600"/>tart
                <div className="flex flex-col">
                    <span>{data?.lat}</span>
                    <span>{data?.lng}</span>
                </div>
            </li>
        </ul>
    </div>
}
