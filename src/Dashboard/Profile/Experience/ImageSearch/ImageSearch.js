import {useEffect} from "react";

const ImageSearch = ({schoolName, handleImageUrl, onError}) => {
    const apiKey = 'AIzaSyA2DL6D565P86EeuOZwe3n1en_dXNkH9yk'
    const cx = '43a775949f03f427d'

    useEffect(() => {
        const abortController = new AbortController();
        const signal = abortController.signal
        const fetchImage = async () => {
            try {
                const response = await fetch(`https://www.googleapis.com/customsearch/v1?q=${encodeURIComponent(schoolName)}&cx=${cx}&key=${apiKey}&searchType=image`, {signal})
                if (!response.ok) {
                    throw new Error('Failed to fetch image')
                }
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
    }, [schoolName]);
}
export default ImageSearch