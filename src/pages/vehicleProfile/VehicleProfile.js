import {Button, Label, Modal, Pagination, Table, TextInput} from 'flowbite-react';
import {IoIosAddCircleOutline} from "react-icons/io";
import {RiRefreshLine} from "react-icons/ri";
import React, {useEffect, useState} from "react";
import {useForm} from "react-hook-form";
import {MdDelete, MdEditNote, MdWorkOutline} from "react-icons/md";
import {FaCaravan} from "react-icons/fa";
import {createVehicleProfile, deleteVehicleProfile, getVehicleProfile} from "../../managers/profileManage";
import DeleteModal from "../../components/DeleteModal";

export default function VehicleProfile() {
    const [profile, setProfile] = useState([]);
    const [openModal, setOpenModal] = useState(false);
    const [openDeleteModal, setOpenDeleteModal] = useState(false);
    const [modalData, setModalData] = useState();
    const [selectedData, setSelectedData] = useState();

    const handleOpenModal = () => {
        setOpenModal(true)
    }
    const handleEdit = (id, name) => () => {
        setModalData({id: id, name: name})
        setOpenModal(true)
    }
    const handleAddJob = (id) => () => {
    }
    const handleAddVehicle = (id) => () => {
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
    }


    useEffect(() => {
        async function fetchMyAPI() {
            let response = await getVehicleProfile()
            setProfile(response)
        }

        fetchMyAPI()
    }, [selectedData, openModal])
    return (
        <div className="overflow-x-auto min-h-screen flex flex-col justify-between">
            <div>

                <div className="p-2 w-full flex justify-between items-center">
                    <Button onClick={() => setSelectedData(Math.random())} size="xs"
                            className='bg-white  text-black hover:text-white flex gap-x-2 items-center'>
                        <RiRefreshLine/> <span className="">Refresh</span></Button>
                    <Button onClick={handleOpenModal} size="xs" color="success" className=" flex gap-x-2 items-center">
                        <IoIosAddCircleOutline/> <span
                        className="">Add New</span></Button>
                </div>

                <Table striped>
                    <Table.Head>
                        <Table.HeadCell>Name</Table.HeadCell>
                        <Table.HeadCell>Total Job</Table.HeadCell>
                        <Table.HeadCell>Total Vehicles</Table.HeadCell>
                        <Table.HeadCell>Cost</Table.HeadCell>
                        <Table.HeadCell>Distance</Table.HeadCell>
                        <Table.HeadCell>Time</Table.HeadCell>
                        <Table.HeadCell>
                            <span className="">Actions</span>
                        </Table.HeadCell>
                    </Table.Head>
                    <Table.Body className="divide-y">
                        {
                            profile?.map((work) => <MakeTableRow
                                key={work?.id}
                                tJob={work?.total_jobs}
                                tVehicle={work?.total_vehicles}
                                name={work?.name}
                                distance={work?.distance}
                                cost={work?.fixed_cost}
                                time={work?.time}
                                id={work?.id}
                                handleAddVehicle={handleAddVehicle}
                                handleDelete={handleDelete}
                                handleEdit={handleEdit}
                                handleAddJob={handleAddJob}
                            />)
                        }
                    </Table.Body>
                </Table>

            </div>
            <div className="flex overflow-x-auto sm:justify-center">
                <Pagination
                    layout="pagination"
                    currentPage={12}
                    totalPages={1000}
                    onPageChange={() => {
                    }}
                    previousLabel="Go back"
                    nextLabel="Go forward"
                    showIcons
                />
            </div>
            <ModalComponent openModal={openModal} setOpenModal={setOpenModal} modalData={modalData}/>
            <DeleteModal openModal={openDeleteModal} id={selectedData?.id} handleDelete={handleDeleteWork}
                         setOpenModal={setOpenDeleteModal}/>

        </div>
    );
}

function MakeTableRow({name, tJob, tVehicle, id, distance, cost, time, handleEdit, handleAddJob, handleAddVehicle, handleDelete}) {
    return (
        <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
            <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                {name}
            </Table.Cell>
            <Table.Cell>{tJob}</Table.Cell>
            <Table.Cell>{tVehicle}</Table.Cell>
            <Table.Cell>{cost}</Table.Cell>
            <Table.Cell>{distance}</Table.Cell>
            <Table.Cell>{time}</Table.Cell>
            <Table.Cell>
                <div className="flex flex-wrap gap-2">
                    <Button onClick={handleEdit(id, name)} size='xs' className="flex justify-center items-center">
                        <span><MdEditNote className="mr-2 h-5 w-5"/> </span> <span className='pl-2'>Edit</span></Button>
                    <Button onClick={handleAddJob(id)} size='xs' color="blue"
                            className="flex justify-center items-center"> <MdWorkOutline className="mr-2 h-5 w-5"/>
                        <span className='pl-2'>Add Job</span></Button>
                    <Button onClick={handleAddVehicle(id)} size='xs' color="blue"
                            className="flex justify-center items-center"> <FaCaravan className="mr-2 h-5 w-5"/> <span
                        className='pl-2'>Add Vehicle</span></Button>
                    <Button onClick={handleDelete(id, name)} size='xs' color="failure"
                            className="flex justify-center items-center"> <MdDelete className="mr-2 h-5 w-5"/> <span
                        className='pl-2'>Delete</span></Button>
                </div>
            </Table.Cell>
        </Table.Row>
    )
}


function ModalComponent({openModal, setOpenModal, modalData}) {
    const {
        register,
        handleSubmit,
        formState: {errors},
    } = useForm()
    const onSubmit = async (data) => {
        console.log(data)
        await createVehicleProfile(data)
        setOpenModal(false)
    }
    return (
        <><Modal show={openModal} onClose={() => setOpenModal(false)}>
            <Modal.Header>Add New Profile</Modal.Header>
            <Modal.Body>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div>
                        <div className="mb-2 block">
                            <Label htmlFor="name" value="Profile Name"/>
                        </div>
                        <TextInput defaultValue={modalData && modalData?.name} {...register('name', {
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
                                       defaultValue={modalData && modalData?.name} {...register('fixed_cost', {
                                required: true
                            })} id="name" type="number" placeholder="100" required/>
                            {errors?.fixed_cost &&
                                <span className='text-red-600'>Fix this field</span>}

                        </div>
                        <div>
                            <div className="mb-2 block">
                                <Label htmlFor="name" value="Distance"/>
                            </div>
                            <TextInput step="any" inputmode="decimal"
                                       pattern="[0-9]*[.,]?[0-9]*"
                                       defaultValue={modalData && modalData?.distance} {...register('distance', {
                                required: true
                            })} id="name" type="number" placeholder="200.0" required/>
                            {errors?.distance &&
                                <span className='text-red-600'>Fix this field</span>}

                        </div>
                        <div>
                            <div className="mb-2 block">
                                <Label htmlFor="name" value="Time"/>
                            </div>
                            <TextInput step="any"  inputmode="decimal"
                                       pattern="[0-9]*[.,]?[0-9]*"
                                       defaultValue={modalData && modalData?.time} {...register('time', {
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

