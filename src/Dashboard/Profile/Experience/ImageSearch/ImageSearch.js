import {useEffect} from "react";

const ImageSearch = ({query, handleImageUrl, onError}) => {
    const env = require('dotenv')

    const apiKey = process.env.API_KEY
    const cx = process.env.SEARCH_ENGINE_ID

    useEffect(() => {
        const abortController = new AbortController();
        const signal = abortController.signal
        const fetchImage = async () => {
            try {
                const response = await fetch(`https://www.googleapis.com/customsearch/v1?q=${encodeURIComponent(query)}&cx=${cx}&key=${apiKey}&searchType=image`, {signal})
                if (!response.ok) {
                    throw new Error('Failed to fetch image')
                }
                console.log('Here is the data')
                const data = await response.json()
                if (data.items && data.items.length > 0) {
                    handleImageUrl(data.items[5].link)
                } else {
                    onError('No images found')
                }
            } catch (err) {
                onError(err.message)
            }
        }
        fetchImage()
        return ()=>{
            abortController.abort("fetch request finished")
        }
    }, [query]);
}
export default ImageSearch