import {IoMdClose} from "react-icons/io";

const ApplicantDetails = ({applicant, onClose, handleResume}) => {
    const handleCase = (word) => {
        const wordSplit = word.split(' ')
        const capitalizedWords = wordSplit.map(w => {
            return w.charAt(0).toUpperCase() + w.slice(1)
        })
        return capitalizedWords.join(' ')
    }
    return (
        <div className="flex fixed inset-0 bg-gray-800 bg-opacity-50 justify-center items-center">
            <div className="bg-white p-8 space-y-4 rounded-lg shadow-lg w-3/4 max-w-lg">
                <IoMdClose size={30} color="gray" className="ml-auto cursor-pointer" onClick={onClose}/>
                <h2 className="text-lg font-bold mb-4">
                    {applicant.firstName} {applicant.lastName}
                </h2>
                <p>Email: {applicant.applicantEmail}</p>
                <p>City: {applicant.city}</p>
                <p>Postal Code: {applicant.postalCode}</p>
                <p>Country: {applicant.country}</p>
                <p>Nationality: {applicant.nationality}</p>
                <p>Gender: {applicant.gender}</p>
                {applicant.additionalDoc &&
                    <div className="flex">
                        <p>Additional Document:</p>
                        <button className="text-[#0875e1] hover:bg-gray-100 ml-6 px-2"
                                onClick={() => handleResume(applicant.additionalDoc, applicant.additionalDocName)}>{applicant.additionalDocName}</button>
                    </div>
                }
                <p>Status: {applicant.applicationStatus}</p>
                <p>Employer Contact: {handleCase(applicant.employerContact)}</p>
            </div>
        </div>
    );
}
export default ApplicantDetails