const Countries = ({ filteredCountries, setJobApplication, setCountriesShow, countriesShow}) =>{
    const handleCountry = (country)=>{
        setJobApplication((prevState) =>({
            ...prevState, country: country
        }))
        setCountriesShow(false)
    }
    return(
        <>
            {filteredCountries.length ? (
                <>
            {filteredCountries.map((country, index) =>(
                <div key={index} className={`p-2 cursor-pointer ${!countriesShow ? 'hidden' : ''}`} onClick={()=> handleCountry(country)}>
                    <h1>{country}</h1>
                </div>
            ))}
                    </>
                )
                :
                <p>No match found</p>
            }
        </>
    )
}
export default Countries