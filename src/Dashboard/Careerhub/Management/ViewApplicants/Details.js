import {IoMdClose} from "react-icons/io";
import {useMediaQuery} from "react-responsive";

const Details = ({ applicant, onClose, handleResume}) => {
    const mediaQuery = useMediaQuery({minWidth: 950})
    const handleCase = (word) => {
        const wordSplit = word.split(' ')
        const capitalizedWords = wordSplit.map(w => {
            return w.charAt(0).toUpperCase() + w.slice(1)
        })
        return capitalizedWords.join(' ')
    }
    return (
        <div className={`p-8 space-y-4 border w-full bg-gray-100 rounded-lg z-50 text-sm`}>
            <IoMdClose size={30} color="gray" className="ml-auto cursor-pointer" onClick={onClose}/>
            <h2 className="text-lg font-bold mb-4">
                {applicant.firstName} {applicant.lastName}
            </h2>

            <p className="w-[75%] border p-2 rounded-md bg-white">Email: {applicant.applicantEmail}</p>
            <p className="w-[75%] border p-2 rounded-md bg-white">City: {applicant.city}</p>
            <p className="w-[75%] border p-2 rounded-md bg-white">Postal Code: {applicant.postalCode}</p>
            <p className="w-[75%] border p-2 rounded-md bg-white">Country: {applicant.country}</p>
            <p className="w-[75%] border p-2 rounded-md bg-white">Nationality: {applicant.nationality}</p>
            <p className="w-[75%] border p-2 rounded-md bg-white">Gender: {applicant.gender}</p>
            {applicant.additionalDoc &&
                <div className="flex">
                    <p className="w-1/2 border p-2 rounded-md bg-white">Additional Document:</p>
                    <button className="text-[#0875e1] hover:bg-gray-100 ml-6 px-2 w-1/2 border p-2 rounded-md bg-white"
                            onClick={() => handleResume(applicant.additionalDoc, applicant.additionalDocName)}>{applicant.additionalDocName}</button>
                </div>
            }
            <p className="w-[75%] border p-2 rounded-md bg-white">Status: {applicant.applicationStatus}</p>
            <p className="w-[75%] border p-2 rounded-md bg-white">Employer Contact: {handleCase(applicant.employerContact)}</p>
        </div>
    )
}
export default Details
