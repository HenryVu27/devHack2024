import { useMapEvent } from 'react-leaflet';

const SetViewOnClick = () => {
    const map = useMapEvent('click', (e) => {
        map.setView(e.latlng, map.getZoom(), {
            animate: true
        });
    });
};

export default SetViewOnClick;
