import DatePicker from "react-datepicker";

const EndDate = ( { endDate, handleEndDateCalender })=>{
    return(
        <DatePicker
            selected={endDate}
            onChange={handleEndDateCalender}
            dateFormat="MM-YYYY"
            showMonthYearPicker
            inline
            />
    )
}
export default EndDate