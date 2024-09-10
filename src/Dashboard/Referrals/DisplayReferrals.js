import {useMediaQuery} from "react-responsive";
import MimeTypes from "../Careerhub/Management/ViewApplicants/MimeTypes";

const DisplayReferrals = ({referrals}) => {
    const mediaQuery = useMediaQuery({minWidth: 824})
    const mimeTypes = MimeTypes
    const handleResume = (resume, resumeName) => {
        const fileExtension = resumeName.split('.')[1]

        try {
            const byteCharacters = atob(resume)
            const length = byteCharacters.length
            const byteNumbers = new Array(length)

            for (let i = 0; i < length; i++) {
                byteNumbers[i] = byteCharacters.charCodeAt(i)
            }

            const byteArray = new Uint8Array(byteNumbers)
            const mimeType = mimeTypes[`.${fileExtension}`] || 'application/octet-stream'

            const blob = new Blob([byteArray], {type: mimeType})
            const url = URL.createObjectURL(blob)
            window.open(url, '_blank')
            URL.revokeObjectURL(url)
        } catch (err) {
            console.error(err)
        }
    }

    const parseDate = (dateString) => {
        const [month, year, day] = dateString.split("-").map(Number)
        return new Date(year, month - 1, day)
    }

    const sortedReferrals = referrals.sort((a, b) => {
        const dateA = parseDate(a.createdAt)
        const dateB = parseDate(b.createdAt)
        return dateB - dateA
    })
    return (
        <div className="flex justify-center items-center w-full">
            <div className="border p-4 space-y-6 rounded-lg mx-24">
                <div className={`flex ${!mediaQuery && "flex-col"} space-x-10 text-xl ml-12`}>
                    {mediaQuery ?
                        <div className="flex space-x-10">
                            <h1>Referrer Name</h1>
                            <h1>Referrer Email</h1>
                        </div>
                        : (
                            <div>
                                <h1 className="text-xl font-medium">Referral Details</h1>
                            </div>
                        )
                    }
                    {mediaQuery &&
                        <div className="flex space-x-10">
                            <h1>Submitted Date</h1>
                            <h1>Resume</h1>
                        </div>
                    }
                </div>

                {sortedReferrals.map((referral, index) => (
                    <div key={index} className={`flex ${!mediaQuery && "flex-col"} text-lg space-x-10`}>
                        <p className={`${!mediaQuery && "absolute mt-2"}`}>{index + 1}.</p>
                        <div className="flex space-x-10 ">
                            <p>{referral.referrerName}</p>
                            <p>{referral.referrerEmail}</p>
                        </div>
                        <div className="flex space-x-10">
                            <p>{referral.createdAt}</p>
                            <button
                                className={`text-[#0875e1] hover:bg-gray-100 cursor-pointer px-4 py-1 ${!mediaQuery && "text-ellipsis overflow-hidden whitespace-nowrap w-[54%]"}`}
                                title={referral.fileName}
                                onClick={() => handleResume(referral.resume, referral.fileName)}>{referral.fileName}</button>
                        </div>
                    </div>
                ))}

            </div>
        </div>
    )
}
export default DisplayReferrals