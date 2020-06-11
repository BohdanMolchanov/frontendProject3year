import React, { Fragment } from "react";

import { ImageBlock } from "../../_func_components";
import { Map, InfoWindow, Marker, GoogleApiWrapper } from "google-maps-react";
class ContactsPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    const {} = this.state;
    const images = [
      { src: "public/header-1.png", alterText: "Cure 1" },
      { src: "public/header-2.png", alterText: "Cure 2" },
      { src: "public/header-3.png", alterText: "Cure 3" },
    ];
    console.log("sdfsdfsdfsdfsdf");
    return (
      <div className="contacts-page">
        <div className="gallerry">
          {images &&
            images.map((item) => (
              <ImageBlock
                key={item.src}
                src={item.src}
                alterText={item.alterText}
              />
            ))}
        </div>

        <MapContainer />
      </div>
    );
  }
}
const mapStyles = {
  width: "100%",
  height: "100%",
};

export class MapContainer extends React.Component {
  render() {
    return (
      <div style={{}}>
        <Map
          containerStyle={{ height: "100px", width: "100px" }}
          google={this.props.google}
          zoom={14}
        >
          <Marker onClick={this.onMarkerClick} name={"Current location"} />
        </Map>
      </div>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: "AIzaSyAovrqQV-XSumHcEvJ5_UIQOn9yOh1zMFY",
})(MapContainer);

export { ContactsPage };
