import {useEffect, useState} from 'react'

interface usePhotoProps  {
    query: string;
    pageNumber: number
}

const usePhotos = ({query,pageNumber}: usePhotoProps) => {   
    const [maxPages, setMaxPages]= useState<number>(0)
    const [photos, setPhotos] = useState<Array<any>>([])
    const [error, setError] = useState({
        msg: "",
        state: false
      })

    useEffect(() => {
        if(photos.length !== 0 && maxPages !== 0) {
          setPhotos([])
          setMaxPages(0)
        }
      }, [query])

    useEffect(() => {
            fetch(`https://api.unsplash.com/search/photos?page=${pageNumber}&per_page=30&query=${query}&client_id=UOwP7GGEBvykTPAtEi2eNVjwpAiAJ197gjbIWxWUp1U`)
            .then(response =>{
                if(!response.ok) throw new Error(`${response.status} Error, something went wrong`)
                return response.json()
            })
            .then(data => {
                setPhotos(state => [...state, ...data.results])
                setMaxPages(data.total_pages)
            })
            .catch(err => {
                setError({
                  msg: err.message,
                  state: true
                })
              })
    },[query, pageNumber])
    
    return {photos, maxPages, error}
}

export default usePhotos