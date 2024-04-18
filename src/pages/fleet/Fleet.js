import { Button, Modal, Table } from "flowbite-react";
import "leaflet/dist/leaflet.css";
import React, { useEffect, useState } from "react";
import { IoIosAddCircleOutline } from "react-icons/io";
import { RiRefreshLine } from "react-icons/ri";
import DefaultPagination from "../../components/DefaultPagination";
import DeleteModal from "../../components/DeleteModal";
import { apiRoutes } from "../../components/constants";
import useDataFetch from "../../hooks/useDataFetch";
import { deleteVehicle } from "../../managers/fleetManager";
import BulkInsertModal from "./components/BulkInsertModal";
import FleetForm from "./components/FleetForm";
import { MdDelete, MdEditNote } from "react-icons/md";


export default function Fleet() {
    const limit = 10
    const [offset, setOffset] = useState(0)
    const {data, refetch} = useDataFetch(apiRoutes.getVehicles({limit: limit, offset: offset}))

    const [openModal, setOpenModal] = useState(false);
    const [openBulkModal, setOpenBulkModal] = useState(false);
    const [openDeleteModal, setOpenDeleteModal] = useState(false);
    const [modalData, setModalData] = useState();
    const [selectedData, setSelectedData] = useState();

    const handleOpenModal = () => {
        setOpenModal(true)
    }
    const handleEdit = (fleet) => () => {
        setModalData(fleet)
        setOpenModal(true)
    }
    const handleOpenBulkModal = () => {
        setOpenBulkModal(true)
    }
    const handleDelete = (id, name) => () => {
        setSelectedData({id, name})
        setOpenDeleteModal(true)
    }
    const handleDeleteVehicle = () => (setOpenDeleteModal) => async () => {
        await deleteVehicle(selectedData?.id).then(() => {
            refetch()
            setOpenDeleteModal(false);
            setSelectedData()
        })

    }

    useEffect(() => {
        refetch()
        if(!openModal){
            setModalData(null)
        }

    }, [openModal])
    return (
        <div className="overflow-x-auto min-h-screen">
            <div className="p-2 w-full flex justify-between items-center">
                <Button onClick={()=>refetch()} size="xs" className='bg-white  text-black hover:text-white flex gap-x-2 items-center'>
                    <RiRefreshLine/> <span className="">Refresh</span></Button>
                    
                <div className="flex justify-end gap-x-2">
                <Button onClick={handleOpenModal} size="xs" color="success" className=" flex gap-x-2 items-center">
                    <IoIosAddCircleOutline/> <span
                    className="">Add New</span></Button>
                <Button onClick={handleOpenBulkModal} size="xs" color="blue" className=" flex gap-x-2 items-center">
                        <IoIosAddCircleOutline/> <span
                        className="">Bulk Create</span></Button>
                </div>
                
            </div>
            <Table striped>
                <Table.Head>
                    <Table.HeadCell>ID</Table.HeadCell>
                    <Table.HeadCell>Name</Table.HeadCell>
                    <Table.HeadCell>Latitude</Table.HeadCell>
                    <Table.HeadCell>Longitude</Table.HeadCell>
                    <Table.HeadCell>
                        <span className="">Actions</span>
                    </Table.HeadCell>
                </Table.Head>
                <Table.Body className="divide-y">
                    {
                        data?.results?.map((fleet) => <MakeTableRow
                            key={fleet?.id}
                            data={fleet}
                            handleDelete={handleDelete}
                            handleEdit={handleEdit}
                        />)
                    }
                </Table.Body>
            </Table>
            <DefaultPagination setOffset={setOffset} limit={limit} total={data?.count} />
            <ModalComponent openModal={openModal} setOpenModal={setOpenModal} modalData={modalData}/>
            <BulkInsertModal openModal={openBulkModal} setOpenModal={setOpenBulkModal}/>
            <DeleteModal openModal={openDeleteModal} id={selectedData?.id} handleDelete={handleDeleteVehicle}
                         setOpenModal={setOpenDeleteModal}/>
        </div>
    );
}

function MakeTableRow({data, handleEdit, handleDelete}) {
    return (
        <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
        <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
            {data?.id}
        </Table.Cell>
            <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                {data?.name}
            </Table.Cell>
            <Table.Cell>{data?.lat}</Table.Cell>
            <Table.Cell>{data?.lng}</Table.Cell>
            <Table.Cell>
                <div className="flex flex-wrap gap-2">
                    <Button onClick={handleEdit(data)} size='xs'><span><MdEditNote className="mr-2 h-5 w-5"/> </span> <span className='pl-2'>Edit</span></Button>
                    <Button onClick={handleDelete(data?.id, data?.name)} size='xs' color="failure"><span><MdDelete className="mr-2 h-5 w-5"/> </span> <span className='pl-2'>Delete</span></Button>
                </div>
            </Table.Cell>
        </Table.Row>
    )
}


function ModalComponent({openModal, setOpenModal, modalData}) {
    return (
        <Modal size='5xl' show={openModal} onClose={() => {
            setOpenModal(false)
        }}>
            <Modal.Header>{modalData ? `${modalData?.name} Edit` : "Add New Fleet"}</Modal.Header>
            <Modal.Body>
                <FleetForm setOpenModal={setOpenModal} data={modalData}/>
            </Modal.Body>
        </Modal>
    );
}


