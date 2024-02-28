import {FormProvider, useForm, useFormContext} from "react-hook-form";
import {Button, Card, Label, Modal, Table} from "flowbite-react";
import React, {useEffect, useMemo, useState} from "react";
import {IoIosAddCircleOutline} from "react-icons/io";
import {CiCircleMinus} from "react-icons/ci";
import {RiRefreshLine} from "react-icons/ri";
import DeleteModal from "../../components/DeleteModal";
import "leaflet/dist/leaflet.css";
import {BiTargetLock} from "react-icons/bi";
import SearchComponent from "../../components/SearchComponent";
import SearchVehicleProfile from "./components/SearchVehicleProfile";
import SearchWork from "./components/SearchWork";
import {createMultiVehicle, deleteVehicle, getVehicle} from "../../managers/fleetManager";

const customTheme = {
    minusButton: "group bg-red-300 text-red-600  m-3 hover:bg-red-600 hover:text-white flex items-stretch rounded-full text-xl text-red-500 items-center justify-center text-center font-medium absolute top-0 right-5",
    addButton: "bg-green-300 hover:bg-green-600 text-green-600 hover:text-white p-2 rounded"
};


export default function Fleet() {
    const [fleets, setFleets] = useState([])
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
    const handleDeleteVehicle = () => (setOpenDeleteModal) => async () => {
        await deleteVehicle(selectedData?.id).then(() => {
            setOpenDeleteModal(false);
            setSelectedData()
        })

    }

    useEffect(() => {
        async function fetchMyAPI() {
            let response = await getVehicle()
            setFleets(response)
        }

        fetchMyAPI().then()
    }, [openModal, openDeleteModal, selectedData])
    return (
        <div className="overflow-x-auto min-h-screen">
            <div className="p-2 w-full flex justify-between items-center">
                <Button onClick={()=>setSelectedData({})} size="xs" className='bg-white  text-black hover:text-white flex gap-x-2 items-center'>
                    <RiRefreshLine/> <span className="">Refresh</span></Button>
                <Button onClick={handleOpenModal} size="xs" color="success" className=" flex gap-x-2 items-center">
                    <IoIosAddCircleOutline/> <span
                    className="">Add New</span></Button>
            </div>
            <Table striped>
                <Table.Head>
                    <Table.HeadCell>Name</Table.HeadCell>
                    <Table.HeadCell>Latitude</Table.HeadCell>
                    <Table.HeadCell>Longitude</Table.HeadCell>
                    <Table.HeadCell>
                        <span className="">Actions</span>
                    </Table.HeadCell>
                </Table.Head>
                <Table.Body className="divide-y">
                    {
                        fleets?.map((job) => <MakeTableRow
                            key={job?.id}
                            lattitude={job?.lat}
                            longitude={job?.lng}
                            name={job?.name}
                            id={job?.id}
                            handleAddVehicle={handleAddVehicle}
                            handleDelete={handleDelete}
                            handleEdit={handleEdit}
                            handleAddJob={handleAddJob}
                        />)
                    }
                </Table.Body>
            </Table>

            <ModalComponent openModal={openModal} setOpenModal={setOpenModal} modalData={modalData}/>
            <DeleteModal openModal={openDeleteModal} id={selectedData?.id} handleDelete={handleDeleteVehicle}
                         setOpenModal={setOpenDeleteModal}/>
        </div>
    );
}

function MakeTableRow({name, lattitude, longitude, id, handleEdit, handleDelete}) {
    return (
        <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
            <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                {name}
            </Table.Cell>
            <Table.Cell>{lattitude}</Table.Cell>
            <Table.Cell>{longitude}</Table.Cell>
            <Table.Cell>
                <div className="flex flex-wrap gap-2">
                    <Button onClick={handleEdit(id, name)} size='xs'>Edit</Button>
                    <Button onClick={handleDelete(id, name)} size='xs' color="failure">Delete</Button>
                </div>
            </Table.Cell>
        </Table.Row>
    )
}


function ModalComponent({openModal, setOpenModal, modalData}) {
    return (
        <Modal size='5xl' show={openModal} onClose={() => setOpenModal(false)}>
            <Modal.Header>Add New Fleet</Modal.Header>
            <Modal.Body>
                <FleetForm setOpenModal={setOpenModal}/>
            </Modal.Body>
        </Modal>
    );
}

function FleetForm({setOpenModal}) {
    const {
        register,
        control,
        handleSubmit,
        watch,
        getValues,
        setValue,
        formState,
    } = useForm()
    const onSubmit = async (data) => {

        console.log('data', data)
        const vehicles = []
        for (let vehicle of data?.vehicles) {
            let v_data = {}
            v_data.name = vehicle?.name
            v_data.lat = vehicle?.lat
            v_data.lng = vehicle?.lng
            v_data.start_at = new Date(vehicle.start_at).toISOString()
            v_data.end_at = new Date(vehicle.end_at).toISOString()
            v_data.capacity = vehicle?.capacity
            v_data.profile_id = vehicle?.profile?.value
            v_data.work_id = data?.work?.value
            vehicles.push(v_data)
        }
        console.log("vehicles", vehicles)
        await createMultiVehicle(vehicles).then((e) => setOpenModal(false))


    }
    return (
        <FormProvider {...{
            register,
            control,
            formState,
            watch,
            getValues,
            setValue
        }}>
            <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-3 gap-x-2">
                <div className='col-span-1'>
                    <FleetDefinition/>
                    <Button size="xs" className="mt-4" type="submit">Submit</Button>
                </div>
                <div className="col-span-2">
                    <Jobs/>
                </div>
            </form>
        </FormProvider>
    )

}

function FleetDefinition() {
    const {register, watch, getValues, setValue} = useFormContext()
    return (
        <>
            <Card className="max-w-sm">
                <div className="flex flex-col gap-4">
                    <div>
                        <div className="mb-2 block">
                            <Label htmlFor="type" value="Work"/>
                        </div>
                        <SearchWork/>
                    </div>
                </div>
            </Card>
        </>
    )
}

function Jobs() {
    const {watch, getValues, setValue, formState: {errors}} = useFormContext()
    const newVehicles = {lng: '', lat: '', start_at: '', capacity: 0, end_at: ''}


    const MultiField = useMemo(() => {
        return getValues('vehicles')
    }, [watch('vehicles')])

    const handleAddJob = () => {
        const vehicles = getValues('vehicles')
        setValue('vehicles', [...vehicles, newVehicles])
    }
    const handleRemove = (index) => () => {
        if (index !== 0) {
            const vehicles = getValues('vehicles')
            vehicles.splice(index, 1)
            setValue('vehicles', vehicles)
        }
    }

    useMemo(() => {
        setValue('vehicles', [newVehicles])
    }, [])
    return (
        <>
            {MultiField?.map((element, index) => <FleetCard key={index} index={index}
                                                            handleRemove={handleRemove}
            />)}

            <div className="flex justify-center items-center my-4">
                <button className={customTheme.addButton} onClick={handleAddJob}>
                    <IoIosAddCircleOutline className="h-6 w-6"/>
                </button>
            </div>

        </>
    )
}


function FleetCard({handleRemove, index}) {
    const {register, getValues, setValue} = useFormContext()
    const setLatLang = (value) => {
        // console.log(value)
        setValue(`vehicles.${index}.lat`, value?.Latitude)
        setValue(`vehicles.${index}.lng`, value?.Longitude)
    }
    const lat = useMemo(() => {
        const lat = getValues(`vehicles.${index}.lat`)
        return parseFloat(lat)?.toFixed(4) ?? ''
    }, [getValues(`vehicles.${index}.lat`)])
    const lng = useMemo(() => {
        const lat = getValues(`vehicles.${index}.lng`)
        return parseFloat(lat)?.toFixed(4) ?? ''
    }, [getValues(`vehicles.${index}.lng`)])
    return (
        <>
            <Card className="relative mb-4">

                <button className={customTheme.minusButton} onClick={handleRemove(index)}
                >
                    <CiCircleMinus/>
                </button>

                <div className="flex flex-col gap-4">
                    <div className="grid grid-cols-2 gap-4 justify-between items-center">


                        <div className="">
                            <label htmlFor="number-input"
                                   className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Name:</label>
                            <input type="text"
                                   id="number-input" {...register(`vehicles.${index}.name`)}
                                   aria-describedby="helper-text-explanation"
                                   className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                   placeholder="100" required/>
                        </div>
                        <div className="">
                            <label htmlFor="number-input"
                                   className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Insert
                                Capacity:</label>
                            <input pattern="^\d+$" type="number"
                                   id="number-input" {...register(`vehicles.${index}.capacity`)}
                                   aria-describedby="helper-text-explanation"
                                   className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                   placeholder="100" required/>
                        </div>
                        <div className="col-span-2">
                            <div className="mb-2 block">
                                <Label htmlFor="type" value="Vehicle Profile"/>
                            </div>
                            <SearchVehicleProfile name={`vehicles.${index}.profile`}/>
                        </div>
                    </div>
                    <div className="flex justify-between items-center">

                        <div className="">
                            <label htmlFor="number-input"
                                   className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Start
                                Time:</label>
                            <input step="1" type="datetime-local"
                                   id="number-input" {...register(`vehicles.${index}.start_at`)}
                                   aria-describedby="helper-text-explanation"
                                   className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                   placeholder="100" required/>
                        </div>
                        <div className="">
                            <label htmlFor="number-input"
                                   className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">End
                                Time:</label>
                            <input pattern="[0-9]{4}-[0-9]{2}-[0-9]{2}T[0-9]{2}:[0-9]{2}:[0-9]{2}" step="1"
                                   type="datetime-local" id="number-input" {...register(`vehicles.${index}.end_at`)}
                                   aria-describedby="helper-text-explanation"
                                   className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                   placeholder="5" required/>
                        </div>
                    </div>
                    <div>
                        <div className="flex justify-between">
                            <span className="inline-flex  justify-center items-center "><BiTargetLock
                                className="text-rose-600"/>Longitude:{lng}</span>
                            <span className="inline-flex justify-center items-center"><BiTargetLock
                                className="text-green-400"/>Longitude:{lat}</span>
                        </div>
                        <div>
                            <SearchComponent setValue={setLatLang}/>
                        </div>
                    </div>
                </div>
            </Card>
        </>
    )
}
