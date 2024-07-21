import {useEffect} from "react";

const ImageSearch = ({query, handleImageUrl, onError}) => {

    const apiKey = process.env.API_KEY
    const cx = process.env.CX_KEY
    console.log('Here are the keys', apiKey, cx)
    useEffect(() => {
        const abortController = new AbortController();
        const signal = abortController.signal
        const fetchImage = async () => {
            try {
                const response = await fetch(`https://www.googleapis.com/customsearch/v1?q=${encodeURIComponent(query)}&cx=${cx}&key=${apiKey}&searchType=image`, {signal})
                if (!response.ok) {
                    throw new Error('Failed to fetch image')
                }

                const data = await response.json()
                console.log('Here is the data', data)
                if (data.items && data.items.length > 0) {
                    handleImageUrl(data.items[3].link)
                } else {
                    onError('No images found')
                }
            } catch (err) {
                onError(err.message)
            }
        }
        fetchImage()
        return () => {
            abortController.abort("fetch request finished")
        }
    }, [query, apiKey, cx, handleImageUrl, onError]);
}
export default ImageSearch