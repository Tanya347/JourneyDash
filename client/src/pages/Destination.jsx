import React, {useState, useEffect} from 'react'
import Map, {Marker} from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
const Destination = () => {
  const [places, setPlaces] = useState([]);
  const [value, setValue] = useState("")
  useEffect(() =>{
    getPlaces();
  },[value])
  console.log(places)

  const getPlaces = async() => {
    const promise = await fetch(`https://api.mapbox.com/geocoding/v5/mapbox.places/${value}.json?access_token=pk.eyJ1IjoidGFuZ2xlZHZpbmV6eiIsImEiOiJjbHRzdjRtYzAwcjl2Mm5vYW1hNDhza3kxIn0.GB7H7hpV4fw2CMRGQppeKw`)
    const data = await promise.json();
    setPlaces(data.features);
  }

  const handleClick = () => {

  }

  return (
    <div>

      <div className="map">
      <Map
        initialViewState={{
          latitude: 37.8,
          longitude: -122.4,
          zoom: 14
        }}
        style={{width: 800, height: 600}}
        mapStyle="mapbox://styles/mapbox/streets-v9"
        mapboxAccessToken="pk.eyJ1IjoidGFuZ2xlZHZpbmV6eiIsImEiOiJjbHRzdjRtYzAwcjl2Mm5vYW1hNDhza3kxIn0.GB7H7hpV4fw2CMRGQppeKw"
      >
        <Marker className="marker" longitude={77.2090057} latitude={28.6138954} color="red" />
      </Map>
      </div>
    </div>
  )
}

export default Destination