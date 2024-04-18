import { Button, Label, Modal, Table, TextInput } from 'flowbite-react';
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { IoIosAddCircleOutline } from "react-icons/io";
import { MdDelete, MdEditNote } from "react-icons/md";
import { RiRefreshLine } from "react-icons/ri";
import DefaultPagination from '../../components/DefaultPagination';
import DeleteModal from "../../components/DeleteModal";
import { apiRoutes } from '../../components/constants';
import useDataFetch from '../../hooks/useDataFetch';
import { createVehicleProfile, deleteVehicleProfile, updateVehicleProfile } from "../../managers/profileManage";

export default function VehicleProfile() {
    const limit = 10
    const [offset, setOffset] = useState(0)
    const {data, refetch} = useDataFetch(apiRoutes.getVehicleProfiles({limit: limit, offset: offset}))
    const [openModal, setOpenModal] = useState(false);
    const [openDeleteModal, setOpenDeleteModal] = useState(false);
    const [modalData, setModalData] = useState();
    const [selectedData, setSelectedData] = useState();

    const handleOpenModal = () => {
        setOpenModal(true)
    }
    const handleEdit = (data) => () => {
        setModalData(data)
        setOpenModal(true)
    }
    const handleDelete = (id, name) => async () => {
        setSelectedData({id, name})
        setOpenDeleteModal(true)
        //
    }
    const handleDeleteWork = () => (setOpenDeleteModal) => async () => {
        setOpenDeleteModal(false)
        await deleteVehicleProfile(selectedData?.id)
        setSelectedData(undefined)
        refetch()
    }


    useEffect(() => {
        refetch()
    }, [openModal])
    return (
        <div className="overflow-x-auto min-h-screen flex flex-col justify-between">
            <div>

                <div className="p-2 w-full flex justify-between items-center">
                    <Button onClick={() => refetch()} size="xs"
                            className='bg-white  text-black hover:text-white flex gap-x-2 items-center'>
                        <RiRefreshLine/> <span className="">Refresh</span></Button>
                    <Button onClick={handleOpenModal} size="xs" color="success" className=" flex gap-x-2 items-center">
                        <IoIosAddCircleOutline/> <span
                        className="">Add New</span></Button>
                </div>

                <Table striped>
                    <Table.Head>
                        <Table.HeadCell>Id</Table.HeadCell>
                        <Table.HeadCell>Name</Table.HeadCell>
                        <Table.HeadCell>Total Vehicles</Table.HeadCell>
                        <Table.HeadCell>Fixed Cost</Table.HeadCell>
                        <Table.HeadCell>Cost Per Meter</Table.HeadCell>
                        <Table.HeadCell>Cost Per Second</Table.HeadCell>
                        <Table.HeadCell>
                            <span className="">Actions</span>
                        </Table.HeadCell>
                    </Table.Head>
                    <Table.Body className="divide-y">
                        {
                            data?.results?.map((profile) => <MakeTableRow
                                data={profile}
                                key={profile?.id}
                                handleDelete={handleDelete}
                                handleEdit={handleEdit}
                            />)
                        }
                    </Table.Body>
                </Table>

            </div>
           
            <DefaultPagination setOffset={setOffset} limit={limit} total={data?.count}/>
            <ModalComponent openModal={openModal} setOpenModal={setOpenModal} modalData={modalData} setModalData={setModalData}/>
            <DeleteModal openModal={openDeleteModal} id={selectedData?.id} handleDelete={handleDeleteWork}
                         setOpenModal={setOpenDeleteModal}/>

        </div>
    );
}

function MakeTableRow({name, data, handleEdit, handleDelete}) {
    return (
        <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
            <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                {data?.id}
            </Table.Cell>
            <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                {data?.name}
            </Table.Cell>
            <Table.Cell>{data?.total_vehicles}</Table.Cell>
            <Table.Cell>{data?.fixed_cost}</Table.Cell>
            <Table.Cell>{data?.distance}</Table.Cell>
            <Table.Cell>{data?.time}</Table.Cell>
            <Table.Cell>
                <div className="flex flex-wrap gap-2">
                    <Button onClick={handleEdit(data)} size='xs' className="flex justify-center items-center">
                        <span><MdEditNote className="mr-2 h-5 w-5"/> </span> <span className='pl-2'>Edit</span></Button>
                    <Button onClick={handleDelete(data?.id, data?.name)} size='xs' color="failure"
                            className="flex justify-center items-center"> <MdDelete className="mr-2 h-5 w-5"/> <span
                        className='pl-2'>Delete</span></Button>
                </div>
            </Table.Cell>
        </Table.Row>
    )
}


function ModalComponent({openModal, setOpenModal, modalData, setModalData}) {
    const {
        register,
        reset,
        handleSubmit,
        formState: {errors},
    } = useForm({defaultValues:{
        name: modalData?.name,
        fixed_cost: modalData?.fixed_cost,
        distance: modalData?.distance,
        time: modalData?.time
    }})
    const onSubmit = async (data) => {
        if (modalData?.id){
            await updateVehicleProfile(modalData?.id, data)
            setModalData(null)
        }else {
            await createVehicleProfile(data)
        }
        setOpenModal(false)
    }
    React.useEffect(() => {
        reset({name: modalData?.name, fixed_cost: modalData?.fixed_cost, distance: modalData?.distance, time: modalData?.time})
    }, [reset, modalData]);
    return (
        <><Modal show={openModal} onClose={() => setOpenModal(false)}>
            <Modal.Header>{modalData? `${modalData?.name} Edit` :"Add New Profile"}</Modal.Header>
            <Modal.Body>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div>
                        <div className="mb-2 block">
                            <Label htmlFor="name" value="Profile Name"/>
                        </div>
                        <TextInput {...register('name', {
                            required: true,
                            maxLength: 20
                        })} id="name" type="text" placeholder="New Vehicle Profile" required/>
                        {errors.name?.type === 'maxLength' &&
                            <span className='text-red-600'>Name cannot exceed 20 characters.</span>}
                        {errors.name?.type === 'required' &&
                            <span className='text-red-600'>This field is required</span>}

                    </div>
                    <div className="grid grid-cols-3 gap-4">
                        <div>
                            <div className="mb-2 block">
                                <Label htmlFor="name" value="Fixed Cost"/>
                            </div>
                            <TextInput step="any"  inputmode="decimal"
                                       pattern="[0-9]*[.,]?[0-9]*"
                                       {...register('fixed_cost', {
                                required: true
                            })} id="name" type="number" placeholder="100" required/>
                            {errors?.fixed_cost &&
                                <span className='text-red-600'>Fix this field</span>}

                        </div>
                        <div>
                            <div className="mb-2 block">
                                <Label htmlFor="name" value="Cost Per Meter"/>
                            </div>
                            <TextInput step="any" inputmode="decimal"
                                       pattern="[0-9]*[.,]?[0-9]*"
                                       {...register('distance', {
                                required: true
                            })} id="name" type="number" placeholder="200.0" required/>
                            {errors?.distance &&
                                <span className='text-red-600'>Fix this field</span>}

                        </div>
                        <div>
                            <div className="mb-2 block">
                                <Label htmlFor="name" value="Cost Per Second"/>
                            </div>
                            <TextInput step="any"  inputmode="decimal"
                                       pattern="[0-9]*[.,]?[0-9]*"
                                       {...register('time', {
                                required: true
                            })} id="time" type="number" placeholder="12.0" required/>
                            {errors?.time &&
                                <span className='text-red-600'>Fix this field</span>}

                        </div>
                    </div>
                    <Button className="mt-4" type="submit">Submit</Button>
                </form>
            </Modal.Body>
        </Modal>
        </>
    );
}

