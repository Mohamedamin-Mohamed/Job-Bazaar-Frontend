import {useEffect} from "react";

const ImageSearch = ({query, handleImageUrl, onError}) => {
    useEffect(() => {
        const abortController = new AbortController();
        const signal = abortController.signal
        const fetchImage = async () => {
            const token = localStorage.getItem("token")
            try {
                if (token) {
                    const response = await fetch(`http://localhost:8080/api/fetch-image/imageUrl?query=${query}`, {
                        method: 'GET',
                        headers: {
                            'Authorization': `Bearer ${token}`
                        },
                        signal
                    })

                    if (!response.ok) {
                        throw new Error();
                    }
                    const dataJson = await response.json()

                    const data = dataJson.data
                    if (data.items && data.items.length > 0) {
                        handleImageUrl(data.items[7].link)
                    } else {
                        onError('No images found')
                    }
                }
            } catch (err) {
                onError("Image couldn't be fetched")
            }
        }
        fetchImage()
        return () => {
            abortController.abort("fetch request finished")
        }
    }, [query]);
}
export default ImageSearch