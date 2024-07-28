import {useEffect} from "react";
import {useDispatch} from "react-redux";
import {setLocationInfo} from "../../Redux/LocationSlice";

const AddressFetcher = ({latitude, longitude, onError}) => {
    const dispatch = useDispatch()

    useEffect(() => {
        const abortController = new AbortController()
        const signal = abortController.signal

        const fetchAddress = async () => {
            try {
                const response = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}
               &lon=${longitude}`, {signal});
                const data = await response.json()
                console.log(data)
                let address = {
                    city: data.address.city || data.address.village || data.address.town || data.address.municipality,
                    states: data.address.state,
                    country: data.address.country
                }
                dispatch(setLocationInfo(address))
            } catch (err) {
                onError('Failed to fetch address')
            }
        }
        fetchAddress()
        return ()=>{
            abortController.abort("component unmounted or dependency changed")
        }
    }, [latitude, longitude, dispatch, onError]);
    return null;
}
export default AddressFetcher