import "bootstrap/dist/css/bootstrap.min.css";
import "./Home.css";
import { useState } from "react";
import OrpingtonMap from "./Orpington";
import { Modal, Button, Carousel } from "react-bootstrap";
import jsonData from "../../data.json";

const Home = () => {
  const [searchQuery, setSearchQuery] = useState(""); //State for searchquery
  const [filteredProperties, setFilteredProperties] = useState([]); //State used for filteredProperities
  const [clickInfo, setclickInfo] = useState(null); //State  used for getting more information about properties
  const [showModal, setShowModal] = useState(false); //Showing the modal when user need to view
  const [favourites, setFavourites] = useState([]); // Adding to the favourites section when the user selects to add to favourites
  const [showFavourites, setShowFavourites] = useState(true); //Manage Visibility of favourites

  const handleSearch = () => {
    //Search and Filter the properties searched by the user
    const filteredData = jsonData.properties.filter((property) => {
      return (
        property.type.toLowerCase().includes(searchQuery.toLowerCase()) ||
        property.price.toString().includes(searchQuery) ||
        property.bedrooms.toString().includes(searchQuery) ||
        property.location.toLowerCase().includes(searchQuery.toLowerCase())
      );
    });

    setFilteredProperties(filteredData);
  };

  const addtoFavourites = (property) => {
    //Adds the property to the favourites section
    if (!favourites.find((fav) => fav.id === property.id)) {
      setFavourites([...favourites, property]);
    }
  };

  const toggleFavourites = () => {
    //Handling the view favourites button
    setShowFavourites(!showFavourites);
  };

  const removeItem = (property) => {
    //Remove Items removed by the user
    const updatedFavourites = favourites.filter(
      (fav) => fav.id !== property.id
    );
    setFavourites(updatedFavourites); //update the favourite list
  };

  const handleInfo = (property) => {
    // Open the carousel to view more information of the property
    setclickInfo({
      ...property,
      location: property.location, //gets the location name
      latitude: property.latitude, //gets the latitude
      longitude: property.longitude, //gets the longitude
    });
    setShowModal(true);
  };

  const handleCloseModal = () => {
    //handle the Modal when user wants to exit the Carousel
    setShowModal(false);
  };

  const formatDateAdded = (date) => {
    //View Date Added
    const { month, day, year } = date;
    return `${month} ${day}, ${year}`;
  };

  return (
    <>
      <div className="p-3 mb-2 bg-success text-white">
        {" "}
        {/*Small Description for the introduction. Used padding for all sides and margin bottom*/}
        <div className="p-5 text-center  rounded-0">
          <h1 className="text-white">Believe in finding it</h1>
          <form className="mt-4">
            {" "}
            {/*Set the search bar to allow user to search an item by his/her choice */}
            <div className="input-group mb-3">
              <input
                type="text"
                className="form-control"
                placeholder="Search by type(house,flat), price, bedroom count, latest date, postcode area(BR1, NW1))"
                aria-label="Search"
                aria-describedby="button-addon2"
                value={searchQuery} //represent the state  searchquery
                onChange={(e) => setSearchQuery(e.target.value)} //Update searchquery when the input values changes.
              />
              <br />
              <button
                className="btn btn-outline-warning"
                type="button"
                id="button-addon2"
                onClick={handleSearch} //handlesearch when user clicks on search button.
              >
                Search
              </button>
            </div>
            <button className="btn btn-warning" onClick={toggleFavourites}>
              {" "}
              {/* Toggles visibiloty on the button Click */}
              View Favourites ❤️
            </button>
          </form>
        </div>
      </div>
      <br />
      <br />

      <div className="container">
        {" "}
        {/*Small Introduction about the website and a button to signin or login */}
        <div className="row justify-content-center">
          <div className="col-md-12">
            <div className="mt-4 p-2 bg-light text-dark rounded">
              <h3>🏡Sign in to Streamline your Search.</h3>
              <p>
                Save properties, create alerts and keep track of the enquiries
                you send to agents.
              </p>

              <button
                type="button"
                className="btn btn-light"
                style={{ backgroundColor: "yellow" }}
                onMouseOver={(e) => (e.target.style.backgroundColor = "yellow")}
                onMouseOut={(e) => (e.target.style.backgroundColor = "yellow")}
              >
                Sign in or Create Account
              </button>
            </div>

            <br />

            <div className="results">
              <div className="row">
                {filteredProperties.map(
                  (
                    property // Map the properties coming from the search results
                  ) => (
                    <div
                      className="col-lg-4 col-md-6 col-sm-12 mb-3" //handle media for small and large devices.
                      key={property.id}
                    >
                      <div className="card" style={{ width: "18rem" }}>
                        {" "}
                        {/*Used Bootstrap card to implement the property and details}*/}
                        <img
                          src={property.picture} //Picture from json data
                          className="card-img-top"
                          alt={property.type}
                        />
                        <div className="card-body">
                          <h5 className="card-title">{property.type}</h5>
                          <p className="card-text">Price: £{property.price}</p>
                          <p className="card-text">
                            Location: {property.location}
                          </p>

                          <a
                            href="#"
                            className="btn btn-success"
                            onClick={() => handleInfo(property)} //Open the Carousel to view more info about the property
                          >
                            More info
                          </a>
                          <a
                            href="#"
                            className="btn btn-light"
                            onClick={() => addtoFavourites(property)} //Add the Property to favourites section when click  the button
                          >
                            ❤️
                          </a>
                        </div>
                      </div>
                    </div>
                  )
                )}
              </div>
            </div>
            <br />
            <br />

            <Modal show={showModal} onHide={handleCloseModal}>
              {" "}
              {/*Show the information reguarding the property*/}
              <Modal.Header closeButton>
                <Modal.Title>Property Details</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                {clickInfo &&
                clickInfo.additionalImages &&
                clickInfo.additionalImages.length > 0 ? (
                  <Carousel>
                    {clickInfo.additionalImages.map(
                      (
                        image,
                        index //Map additional images on jsondata
                      ) => (
                        <Carousel.Item key={index}>
                          <img
                            className="d-block w-100"
                            src={image}
                            alt={`Image ${index + 1}`}
                          />
                        </Carousel.Item>
                      )
                    )}
                  </Carousel>
                ) : (
                  //if images are not avaialable it represents as there is no additional images avaialable.
                  <p>No additional images available.</p>
                )}
                {clickInfo && ( //View More details about the property
                  <div>
                    <h3>Type: {clickInfo.type}</h3>
                    <p>Price: £{clickInfo.price}</p>
                    <p>Tenure: {clickInfo.tenure}</p>
                    {clickInfo.added && (
                      <p>Date Added: {formatDateAdded(clickInfo.added)}</p>
                    )}
                    <p>Description: {clickInfo.description}</p>
                    <p>No of Bedrooms: {clickInfo.bedrooms}</p>
                    <p>Location: {clickInfo.location}</p>
                    {clickInfo.latitude && clickInfo.longitude && (
                      <OrpingtonMap //View the map using Orpington.jsx file
                        latitude={clickInfo.latitude}
                        longitude={clickInfo.longitude}
                      />
                    )}
                  </div>
                )}
              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={handleCloseModal}>
                  {" "}
                  {/*Close the Modal Class*/}
                  Close
                </Button>
              </Modal.Footer>
            </Modal>
          </div>
        </div>
        {showFavourites && (
          <div className="FavTab">
            {" "}
            {/*View the Add to Favoutites section */}
            <h3>Favourites ❤️</h3>
            <p>Drag and Drop or Add your favourite items!!.</p>
            <div className="favCard">
              {favourites.map(
                (
                  favProperty //Map added favourites to the favourites section
                ) => (
                  <div
                    className="fav"
                    key={favProperty.id}
                    style={{ width: "18rem", marginRight: "20px" }}
                  >
                    <div key={favProperty.id} className="card">
                      <img
                        src={favProperty.picture}
                        className="card-img-top"
                        alt={favProperty.type}
                      />
                      <div className="card-body">
                        <h5 className="card-title">{favProperty.type}</h5>
                        <p className="card-text">Price: {favProperty.price}</p>
                        <p className="card-text">
                          Location: {favProperty.location}
                        </p>

                        <a
                          href="#"
                          className="btn btn-success"
                          onClick={() => handleInfo(favProperty)}
                        >
                          More info
                        </a>
                        <br />
                        <br />
                        <a
                          href="#"
                          className="btn btn-warning"
                          onClick={() => removeItem(favProperty)} //Remove item functionality to remove single item from the add to favourites section.
                        >
                          Remove Item ❤️
                        </a>
                      </div>
                    </div>
                  </div>
                )
              )}
            </div>
            {/*Add to favourites elements placing section. */}
            <br />
            <br />
            <button
              type="button"
              className="btn btn-success"
              onClick={() => setFavourites([])} //Remove all properties added to the favourites section.
            >
              Remove from Favourites🚮
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default Home;
