import {useEffect} from "react";
import {useDispatch} from "react-redux";
import {setLocationInfo} from "../Redux/LocationSlice";

const AddressFetcher = ({latitude, longitude, onError}) => {
    const dispatch = useDispatch()

    useEffect(() => {
        const fetchAddress = async () => {
            try {
                const response = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}
               &lon=${longitude}`);
                const data = await response.json()
                console.log(data)
                let address = {
                    city: data.address.city,
                    states: data.address.state,
                    country: data.address.country
                }
                dispatch(setLocationInfo(address))
            } catch (err) {
                onError('Failed to fetch address')
            }
        }
        fetchAddress()
    }, [latitude, longitude, dispatch, onError]);
    return null;
}
export default AddressFetcher