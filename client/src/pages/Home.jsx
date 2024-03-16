import React, {useState, useEffect} from 'react'
import Navbar from '../components/Navbar'
import RecCard from "../components/RecCard"
import Map, {Marker} from "react-map-gl"
import 'mapbox-gl/dist/mapbox-gl.css';
import "../styles/home.scss"
import { Link } from 'react-router-dom';

const Home = () => {

    const [places, setPlaces] = useState([]);
    const [value, setValue] = useState("");
    const [viewState, setViewState] = React.useState({
        latitude: 37.8,
        longitude: -122.4,
        zoom: 12
      });


    useEffect(() =>{
        getPlaces();
    }, [value])

    const getPlaces = async() => {
        const promise = await fetch(`https://api.mapbox.com/geocoding/v5/mapbox.places/${value}.json?access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`)
        const data = await promise.json();
        setPlaces(data.features);
    }

    const handleClick = (query) => {
        setValue(query.place_name)
        const { center } = query;
        setViewState((prevState) => ({
          ...prevState,
          latitude: center[1],
          longitude: center[0],
        }));
        setPlaces([])
    }

    const mockData = [
        {
            name: "Banaras",
            image: "https://media.geeksforgeeks.org/wp-content/uploads/20240316170519/view-boat-floating-water-with-nature-scenery_23-2150693552.jpg"
        },
        {
            name: "Venice",
            image: "https://media.geeksforgeeks.org/wp-content/uploads/20240316171305/part-famous-grand-canal-sunset-venice_268835-1045-compressed.jpg"
        },
        {
            name: "Gangtok",
            image: "https://media.geeksforgeeks.org/wp-content/uploads/20240316171148/backpacker-deogyusan-mountains-winter_335224-465-compressed.jpg"
        },
        {
            name: "Cairo",
            image: "https://media.geeksforgeeks.org/wp-content/uploads/20240316170734/low-angle-shot-male-standing-front-isis-aswan-temple-egypt_181624-40838.jpg"
        },
    ]

  return (
    <div className='home'>
        <Navbar />
        <div className="home-wrapper">
                <div className="map">
                    <div className="search">
                        <div className="search-bar">
                            <input placeholder='Search places' type="text" name='place' id='place' value={value} onChange={(e) => setValue(e.target.value)}/>
                        </div>
                        <div className="searches">
                            {
                                places?.map((items, index) => {
                                return (
                                <div key={index} onClick={() =>handleClick(items)}>
                                    <p>{items.place_name}</p>
                                </div>
                                )
                            })
                            }
                        </div>
                    </div>
                    <Link to={`/destination/${value}`}>
                        <Map
                                {...viewState}
                                onMove={evt => setViewState(evt.viewState)}
                                style={{width: 800, height: 400}}
                                mapStyle="mapbox://styles/mapbox/streets-v9"
                                mapboxAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
                            >
                                    <Marker className="marker" longitude={viewState.longitude} latitude={viewState.latitude} color="red" />
                        </Map>
                    </Link>
                </div>
            <h1 className='head'>Recommendations for you</h1>
            <div className="recommendations">
                {mockData.map((d, index) => (
                    <RecCard key={index} image={d.image} name={d.name} />
                ))}
            </div>
        </div>
    </div>
  )
}

export default Home