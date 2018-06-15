import React from "react";
import { Link } from "react-router-dom";
import styles from "./BackButton.module.css";

const BackButton = ({ to }) => (
  <Link to={to} className={styles.wrapper}>
    <div className={styles.b}>B</div>
    <div>A</div>
    <div>C</div>
    <div>K</div>
    <div className={styles.icon}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        version="1.1"
        x="0px"
        y="0px"
        width="30px"
        height="30px"
        viewBox="0 0 346.393 346.393"
      >
        <g transform="rotate(-90 173.60784912109378,173.19676208496094)">
          <path
            id="svg_2"
            d="m205.062957,58.52176c-4.284,-21.42 -15.3,-39.78 -28.764,-56.305c-3.061,-3.672 -9.181,-2.447 -11.629,1.225c-11.016,19.584 -20.196,41.004 -22.644,63.647c-0.612,6.732 9.792,7.345 11.016,1.225c4.284,-16.524 10.404,-32.437 18.36,-47.736c3.06,4.284 6.121,9.18 8.569,14.076c-4.284,-4.284 -14.077,-2.448 -14.077,5.508c-0.612,99.756 -23.256,202.571 -5.508,301.104c1.224,7.956 14.688,6.12 14.076,-1.836c-7.956,-100.368 7.345,-198.899 7.957,-299.268c0,-0.612 0,-1.224 0,-1.224c3.672,7.344 6.119,14.688 7.956,23.256c1.225,9.792 16.524,6.12 14.688,-3.672z"
          />
        </g>
      </svg>
    </div>
  </Link>
);

export default BackButton;
