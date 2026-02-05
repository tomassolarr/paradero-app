export default function InfoParadero({ status, info }) {

    const formatDistance = (meters) => {
    if (meters < 1000) {
        return `${meters} m`;
    }

    const km = (meters / 1000).toFixed(1); 
    return `${km} km`;
    };

    return(
        <li className="info-buses"> 
            <div className="bus-service">
                <div className="bus-service-header">
                    <span className="info-id">{info.id}</span>
                    <span className="info-status">{status}</span>
                </div>
                <ul className="bus-list">
                    {info.buses && info.buses.map(bus=>(
                        <li key={bus.id} className="bus-item">
                            <span className="bus-id">{bus.id}</span>
                            <div className="bus-details">
                                <span className="bus-time">{bus.min_arrival_time}-{bus.max_arrival_time} min</span>
                                <span className="bus-distance">{formatDistance(bus.meters_distance)}</span>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </li>
    )
}
