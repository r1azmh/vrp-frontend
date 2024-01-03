import {FormProvider, useForm} from "react-hook-form";
import {Button, Card, Label, Modal, Select, Table, TextInput} from "flowbite-react";
import React, {useEffect, useMemo, useState} from "react";
import {IoIosAddCircleOutline} from "react-icons/io";
import {CiCircleMinus} from "react-icons/ci";
import {RiRefreshLine} from "react-icons/ri";
import DeleteModal from "../../components/DeleteModal";
import "leaflet/dist/leaflet.css";
import SearchComponent from "../../components/SearchComponent";
import {BiTargetLock} from "react-icons/bi";
import {createJob, createMultiJob, deleteJob, getJob} from "../../managers/jobManage";
import SearchWork from "./components/SearchWork";

const customTheme = {
    minusButton: "group bg-red-300 text-red-600  m-3 hover:bg-red-600 hover:text-white flex items-stretch rounded-full text-xl text-red-500 items-center justify-center text-center font-medium absolute top-0 right-5",
    addButton: "bg-green-300 hover:bg-green-600 text-green-600 hover:text-white p-2 rounded"
};


export default function Job() {
    const [jobs, setJobs] = useState([])
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
    const handleAddJob = (id, name) => () => {
    }
    const handleAddVehicle = (id) => () => {
    }
    const handleDelete = (id, name)=>()=> {
        setSelectedData({id, name})
       setOpenDeleteModal(true)

    }
    const handleDeleteJob= (id) => (setOpenDeleteModal) =>async () => {
        await deleteJob(id).then(() => {
            setOpenDeleteModal(false)
        })
    }

    useEffect(() => {
        async function fetchMyAPI() {
            let response = await getJob()
            setJobs(response)
        }

        fetchMyAPI().then()
    }, [selectedData, openModal, openDeleteModal])
    return (
        <div className="overflow-x-auto min-h-screen">
            <div className="p-2 w-full flex justify-between items-center">
                <Button onClick={() => setSelectedData({})} size="xs"
                        className='bg-white  text-black hover:text-white flex gap-x-2 items-center'>
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
                        jobs?.map((job) => <MakeTableRow
                            key={job?.id}
                            lattitude={job?.lat}
                            longitude={job?.lng}
                            name={job?.name ?? job?.multi?.name + "(multi-job)"}
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
            <DeleteModal openModal={openDeleteModal} id={selectedData?.id} handleDelete={handleDeleteJob}
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
    // const {
    //     register,
    //     handleSubmit,
    //     formState: {errors},
    // } = useForm()
    // const onSubmit = (data) => {
    //     console.log(data)
    //     setOpenModal(false)
    // }
    return (
        <><Modal size='5xl' show={openModal} onClose={() => setOpenModal(false)}>
            <Modal.Header>Add New Job</Modal.Header>
            <Modal.Body>
                <JobForm setOpenModal={setOpenModal}/>
            </Modal.Body>
        </Modal>
        </>
    );
}

function JobForm({setOpenModal}) {
    const {
        register,
        control,
        handleSubmit,
        watch,
        getValues,
        setValue,
        formState: {errors},
    } = useForm()
    const onSubmit = async (data) => {

        console.log('data', data)
        if (data?.job_type !== 'mm') {
            const work = data?.work
            const job = data?.jobs?.[0]
            job.name = data?.name;
            job.work_id = work?.value;
            job.job_type = data?.job_type;
            job.start_at = new Date(job.start_at).toISOString()
            job.end_at = new Date(job.end_at).toISOString()
            await createJob(job).then(setOpenModal(false))
            console.log('job', job)
        }
        if (data?.job_type === 'mm') {
            console.log('data multi', data)
            const jobs = []
            for (let job of data?.jobs) {
                job.work_id = data?.work?.value
                jobs.push(job)
            }
            data.work_id = data?.work?.value
            data.jobs = jobs
            console.log('after', data)
            await createMultiJob(data).then(setOpenModal(false))
        }

    }
    return (
        <FormProvider {...{register, control}}>
            <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-3 gap-x-2">
                <div className='col-span-1'>
                    <JobDefinition register={register} watch={watch} getValues={getValues} setValue={setValue}/>
                    <Button size="xs" className="mt-4" type="submit">Submit</Button>
                </div>
                <div className="col-span-2">
                    <Jobs errors={errors} register={register} watch={watch} getValues={getValues} setValue={setValue}/>
                </div>
            </form>
        </FormProvider>
    )

}

function JobDefinition({register, watch, getValues, setValue}) {
    return (
        <>
            <Card className="max-w-sm">
                <div className="flex flex-col gap-4">
                    <div>
                        <div className="mb-2 block">
                            <Label htmlFor="name" value="Job Name"/>
                        </div>
                        <TextInput {...register("name", {required: true})} id="name" type="text"
                                   placeholder="pickup job-1" required/>
                    </div>
                    <div>
                        <div className="mb-2 block">
                            <Label htmlFor="type" value="Job Type"/>
                        </div>
                        <Select {...register("job_type", {required: true})} id="type" required>
                            <option value='pp'>Pick-up</option>
                            <option value='dd'>Delivery</option>
                            <option value='mm'>Multi</option>
                        </Select>
                    </div>
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

function Jobs({register, watch, getValues, setValue, errors}) {
    const newJob = {lng: null, lat: null, start_at: null, duration: null, demand: null, end_at: null}
    const isMulti = useMemo(() => {
        return getValues('job_type') === 'mm';
    }, [watch('job_type')])

    const MultiField = useMemo(() => {
        return getValues('jobs')

    }, [watch('jobs')])

    const handleAddJob = () => {
        const jobs = getValues('jobs')
        setValue('jobs', [...jobs, newJob])
    }
    const handleRemove = (index) => () => {
        if (index !== 0) {
            const jobs = getValues('jobs')
            jobs.splice(index, 1)
            setValue('jobs', jobs)
        }
    }

    useMemo(() => {
        setValue('jobs', [newJob])
    }, [watch('job_type')])
    return (
        <>
            {MultiField?.map((element, index) => <JobCard register={register} key={index} index={index}
                                                          handleRemove={handleRemove}
                                                          setValue={setValue}
                                                          getValues={getValues}
                                                          isMulti={isMulti}/>)}
            {
                isMulti && <div className="flex justify-center items-center my-4">
                    <button className={customTheme.addButton} onClick={handleAddJob}>
                        <IoIosAddCircleOutline className="h-6 w-6"/>
                    </button>
                </div>
            }
        </>
    )
}


function JobCard({register, getValues, setValue, isMulti, handleRemove, index}) {
    const setLatLang = (value) => {
        // console.log(value)
        setValue(`jobs.${index}.lat`, value?.Latitude)
        setValue(`jobs.${index}.lng`, value?.Longitude)
    }
    const lat = useMemo(() => {
        const lat = getValues(`jobs.${index}.lat`)
        return parseFloat(lat)?.toFixed(4) ?? ''
    }, [getValues(`jobs.${index}.lat`)])
    const lng = useMemo(() => {
        const lat = getValues(`jobs.${index}.lng`)
        return parseFloat(lat)?.toFixed(4) ?? ''
    }, [getValues(`jobs.${index}.lng`)])
    return (
        <>
            <Card className="relative mb-4">
                {
                    isMulti &&
                    <button className={customTheme.minusButton} onClick={handleRemove(index)}
                    >
                        <CiCircleMinus/>
                    </button>
                }
                {/*<SimpleMap />*/}
                <div className="flex flex-col gap-4">
                    {
                        isMulti && <div>
                            <div className="mb-2 block">
                                <Label htmlFor="type" value="Job Type"/>
                            </div>
                            <Select {...register(`jobs.${index}.job_type`)} id="type" required>
                                <option value='pp'>Pick-up</option>
                                <option value='dd'>Delivery</option>
                            </Select>
                        </div>
                    }
                    <div className="flex justify-between items-center">

                        <div className="">
                            <label htmlFor="number-input"
                                   className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Insert
                                Duration:</label>
                            <input pattern="^\d+$" type="number"
                                   id="number-input" {...register(`jobs.${index}.duration`)}
                                   aria-describedby="helper-text-explanation"
                                   className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                   placeholder="100" required/>
                        </div>
                        <div className="">
                            <label htmlFor="number-input"
                                   className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Insert
                                Demand:</label>
                            <input pattern="^\d+$" type="number" id="number-input" {...register(`jobs.${index}.demand`)}
                                   aria-describedby="helper-text-explanation"
                                   className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                   placeholder="5" required/>
                        </div>
                    </div>
                    <div className="flex justify-between items-center">

                        <div className="">
                            <label htmlFor="number-input"
                                   className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Start
                                Time:</label>
                            <input step="1" type="datetime-local"
                                   id="number-input" {...register(`jobs.${index}.start_at`)}
                                   aria-describedby="helper-text-explanation"
                                   className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                   placeholder="100"/>
                        </div>
                        <div className="">
                            <label htmlFor="number-input"
                                   className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">End
                                Time:</label>
                            <input pattern="[0-9]{4}-[0-9]{2}-[0-9]{2}T[0-9]{2}:[0-9]{2}:[0-9]{2}" step="1"
                                   type="datetime-local" id="number-input" {...register(`jobs.${index}.end_at`)}
                                   aria-describedby="helper-text-explanation"
                                   className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                   placeholder="5"/>
                        </div>
                    </div>
                    <div>
                        <div className="flex justify-between">
                            <span className="inline-flex  justify-center items-center "><BiTargetLock
                                className="text-rose-600"/>Longitude:{lng}</span>
                            <span className="inline-flex justify-center items-center"><BiTargetLock
                                className="text-green-400"/>Latitude:{lat}</span>
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
