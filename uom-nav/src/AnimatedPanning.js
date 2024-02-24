import { useMapEvent } from 'react-leaflet';

export default function SetViewOnClick() {
    const map = useMapEvent('click', (e) => {
      map.setView(e.latlng, map.getZoom(), {
        animate: true,
      })
    })

  
    return null
  }