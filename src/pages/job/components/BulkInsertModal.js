import {Button, FileInput, Label, Modal} from "flowbite-react";
import {FormProvider, useForm} from "react-hook-form";
import React from "react";
import SearchWork from "./SearchWork";
import {createBulkJob} from "../../../managers/jobManage";


export default function BulkInsertModal({openModal, setOpenModal}) {
    return (
        <><Modal size='xl' show={openModal} onClose={() => setOpenModal(false)}>
            <Modal.Header>Add Jobs</Modal.Header>
            <Modal.Body>
                <BulkInsertJobForm setOpenModal={setOpenModal}/>
            </Modal.Body>
        </Modal>
        </>
    );
}

function BulkInsertJobForm({setOpenModal}) {
    const {
        register,
        control,
        handleSubmit,
        formState: {errors},
    } = useForm()
    const onSubmit = async (data) => {
        const job = new FormData();
        job.append('work_id', data?.work?.value);
        job.append('file', data?.file[0]);
        await createBulkJob(job).then(setOpenModal(false))
    }
    return (
        <FormProvider {...{register, control}}>
            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-y-2">
                <div className=''>
                    <div className="mb-2 block">
                        <Label htmlFor="work" value="Work"/>
                    </div>
                    <SearchWork/>
                </div>
                <div id="fileUpload" className="">
                    <div className="mb-2 block">
                        <Label htmlFor="file" value="Upload file"/>
                    </div>
                    <FileInput {...register("file")} id="file"
                               helperText="Upload CSV file"/>
                </div>
                <Button type="submit" size="xs" color="blue" className=" flex gap-x-2 items-center">
                    <span
                        className="">Submit</span></Button>
            </form>
        </FormProvider>
    )

}
