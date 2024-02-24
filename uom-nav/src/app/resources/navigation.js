const apiUrl = 'http://localhost:8000/shortest-path';

export const getShortestPath = async (point1, point2) => {
    const { lat: lat1, lng: lon1 } = point1;
    const { lat: lat2, lng: lon2 } = point2;
    const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ lat1, lon1, lat2, lon2 }),
        redirect: 'follow',
        referrerPolicy: 'no-referrer'
    });

    return response.json();
};
