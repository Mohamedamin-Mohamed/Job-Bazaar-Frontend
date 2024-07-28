import DatePicker from "react-datepicker";

const StartDate = ({startDate, handleStartDateCalender}) => {
    return (
        <DatePicker
            selected={startDate}
            onChange={handleStartDateCalender}
            dateFormat="MM-YYYY"
            showMonthYearPicker
            inline
        />
    )
}
export default StartDate