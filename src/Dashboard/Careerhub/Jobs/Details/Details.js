import {useEffect, useRef, useState} from "react";

const Details = ({job, setHeight}) => {
    const refHeight = useRef(null)

    useEffect(()=>{
        if(refHeight.current){
            setHeight(refHeight.current.offsetHeight)
        }
    }, [])
    return (
        <div className="border border-t rounded-md mt-8 w-[90%] ml-8 mb-8 flex-col" ref={refHeight}>
            <div className="flex space-x-4 p-8">
                <p className="font-bold">JOB LOCATION:</p>
                <p>{job.location}</p>
            </div>
            <div className="flex space-x-4 p-8">
                <p className="font-bold">POSITION:</p>
                <p>{job.position}</p>
            </div>
            <div className="flex space-x-4 p-8">
                <p><strong className="mr-2">POSITION DESCRIPTION:</strong> {job.description}</p>
            </div>
            <div className="flex space-x-8 p-8">
                <p><strong className="mr-2">Requirements:</strong> {job.requirements}</p>
            </div>
            <p className="space-x-8 p-8">Anyone interested in this position may apply on-line at www.JobBazaar.com and
                search for Job Posting Number {job.jobId}.</p>
            <p className="space-x-8 p-8">Employee referral bonus: $2,000.00</p>
        </div>
    )
}
export default Details