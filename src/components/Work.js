import {Button, Label, Modal, Pagination, Table, TextInput} from 'flowbite-react';
import {IoIosAddCircleOutline} from "react-icons/io";
import {RiRefreshLine} from "react-icons/ri";
import {useState} from "react";
import {useForm} from "react-hook-form";
import DeleteModal from "./DeleteModal";
import {MdDelete, MdEditNote, MdWorkOutline} from "react-icons/md";
import {FaCaravan} from "react-icons/fa";

export default function Work() {
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
    const handleDelete = (id, name) => () => {
        setSelectedData({id, name})
        setOpenDeleteModal(true)
    }
    const handleDeleteWork = () => (setOpenDeleteModal) => () => {
        setOpenDeleteModal(false)
    }
    return (
        <div className="overflow-x-auto min-h-screen flex flex-col justify-between">
            <div>

                <div className="p-2 w-full flex justify-between items-center bg-white border-b">
                    <Button size="xs" className='bg-white shadow text-black hover:text-white '>
                        <RiRefreshLine className="mr-2 h-5 w-5"/> Refresh</Button>
                    <Button onClick={handleOpenModal} size="xs" color="success"
                            className=" flex shadow gap-x-2 items-center">
                        <IoIosAddCircleOutline className="mr-2 h-5 w-5"/> Add New</Button>
                </div>

                <Table striped>
                    <Table.Head>
                        <Table.HeadCell>Name</Table.HeadCell>
                        <Table.HeadCell>Total Job</Table.HeadCell>
                        <Table.HeadCell>Total Vehicles</Table.HeadCell>
                        <Table.HeadCell>
                            <span className="">Actions</span>
                        </Table.HeadCell>
                    </Table.Head>
                    <Table.Body className="divide-y">
                        <MakeTableRow
                            tJob={12}
                            tVehicle={13}
                            name={'apple'}
                            id={1}
                            handleAddVehicle={handleAddVehicle}
                            handleDelete={handleDelete}
                            handleEdit={handleEdit}
                            handleAddJob={handleAddJob}
                        />
                    </Table.Body>
                </Table>

            </div>
            <div className="flex overflow-x-auto sm:justify-center">
                <Pagination
                    layout="pagination"
                    currentPage={12}
                    totalPages={1000}
                    onPageChange={()=>{}}
                    previousLabel="Go back"
                    nextLabel="Go forward"
                    showIcons
                />
            </div><ModalComponent openModal={openModal} setOpenModal={setOpenModal} modalData={modalData}/>
            <DeleteModal openModal={openDeleteModal} id={selectedData?.id} handleDelete={handleDeleteWork}
                         setOpenModal={setOpenDeleteModal}/>

        </div>
    );
}

function MakeTableRow({name, tJob, tVehicle, id, handleEdit, handleAddJob, handleAddVehicle, handleDelete}) {
    return (
        <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
            <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                {name}
            </Table.Cell>
            <Table.Cell>{tJob}</Table.Cell>
            <Table.Cell>{tVehicle}</Table.Cell>
            <Table.Cell>
                <div className="flex flex-wrap gap-2">
                    <Button onClick={handleEdit(id, name)} size='xs' className="flex justify-center items-center">
                        <span><MdEditNote className="mr-2 h-5 w-5"/> </span> <span className='pl-2'>Edit</span></Button>
                    <Button onClick={handleAddJob(id)} size='xs' color="blue"
                            className="flex justify-center items-center"> <MdWorkOutline className="mr-2 h-5 w-5"/> <span className='pl-2'>Add Job</span></Button>
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
    const onSubmit = (data) => {
        console.log(data)
        setOpenModal(false)
    }
    return (
        <><Modal show={openModal} onClose={() => setOpenModal(false)}>
            <Modal.Header>Add New Work</Modal.Header>
            <Modal.Body>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="mb-2 block">
                        <Label htmlFor="name" value="Work Name"/>
                    </div>
                    <TextInput defaultValue={modalData && modalData?.name} {...register('name', {
                        required: true,
                        maxLength: 20
                    })} id="name" type="text" placeholder="New Work" required/>
                    {errors.name?.type === 'maxLength' &&
                        <span className='text-red-600'>Name cannot exceed 20 characters.</span>}
                    {errors.name?.type === 'required' && <span className='text-red-600'>This field is required</span>}

                    <Button className="mt-4" type="submit">Submit</Button>
                </form>
            </Modal.Body>
        </Modal>
        </>
    );
}
