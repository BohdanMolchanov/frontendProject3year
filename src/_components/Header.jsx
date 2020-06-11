import React, { Fragment } from "react";
import { CureRow } from "../_func_components";
import Carousel from "react-bootstrap/Carousel";
import Slider from "infinite-react-carousel";
const Header = () => {
  return (
    <header>
      <iframe
        src="https://www.youtube.com/embed/JjFPhjgJnMI?loop=1&autoplay=1&mute=1&showinfo=0&controls=0&playlist=JjFPhjgJnMI&cc_load_policy=1&disablekb=1&modestbranding=1"
        frameBorder="0"
        allow="autoplay; encrypted-media"
        title="video"
        className="video-player"
      />
    </header>
  );
};
export { Header };
