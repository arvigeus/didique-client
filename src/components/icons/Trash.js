// @flow
import React from "react";
import Icon from "./Icon";

type MessagesPropType = {
  size: number,
  className?: string,
  link?: string,
  badge?: number,
  badgeClass?: string
};

const Messages = ({
  size,
  className,
  link,
  badge,
  badgeClass
}: MessagesPropType) => (
  <Icon className={className} link={link} badge={badge} badgeClass={badgeClass}>
    <svg
      xmlns="http://www.w3.org/2000/svg"
      version="1.1"
      x="0px"
      y="0px"
      width={`${size}px`}
      height={`${size}px`}
      viewBox="0 0 470.713 470.714"
    >
      <path
        d="M96.01,133.456c3.884,2.676,8.163,4.332,12.619,5.292c-5.324,99.039-15.803,202.436,20.416,296.978
			c1.742,4.545,4.938,7.389,8.604,8.846c1.26,1.762,3.052,3.326,5.637,4.479c64.729,28.746,133.522,27.487,199.892,4.459
			c8.674-3.012,11.314-11.243,9.735-18.256c12.604-95.928,24.562-194.694,14.67-291.43c7.83-1.725,15.147-5.027,20.586-11.075
			c10.745-11.959,8.679-27.345,3.387-41.068c0.011-3.816-1.787-7.467-5.87-9.973c-1.62-1.254-3.544-2.127-5.596-2.59
			c-29.727-12.703-61.367-19.342-93.734-22.427c0.569-2.892,0.32-6.058-1.081-9.308C275.168,24.077,255.044-3.4,226.105,0.345
			c-27.863,3.603-41.365,30.793-47.007,55.726c-18.611,0.978-37.039,2.207-55.035,3.245c-0.125,0.005-0.236,0.048-0.36,0.058
			c-0.854-0.109-1.722-0.163-2.61-0.058c-19.291,2.267-35.53,11.491-43.975,29.609c-1.123,2.407-1.678,4.948-1.737,7.439
			c-0.749,2.455-0.8,5.278,0.239,8.444C79.532,116.676,85.656,126.312,96.01,133.456z M324.105,428.545
			c-54.888,16.904-112.16,18.712-165.844-5.129c-0.815-0.36-1.623-0.579-2.422-0.802c-32.966-90.754-22.635-189.447-17.514-284.177
			c65.534-4.644,131.547-5.657,196.814,2.567c0.771,0.812,1.655,1.518,2.646,2.138C347.57,237.831,336.404,334.526,324.105,428.545z
			 M228.662,29.693c12.937-1.676,22.006,13.327,27.591,25.111c-15.449-0.536-30.97-0.447-46.445,0
			C212.948,43.419,218.445,31.013,228.662,29.693z M110.845,92.726c-1.826,1.579,4.918-2.508,2.775-1.617
			c1.498-0.625,3.075-1.046,4.639-1.478c-0.358,0.099,4.903-0.879,2.833-0.64c0.183-0.021,0.355-0.074,0.536-0.1
			c0.785,0.074,1.567,0.152,2.43,0.1c77.348-4.481,167.339-15.376,240.798,15.658c0.233,0.69,0.533,1.356,0.746,2.059
			c0.295,1.018,0.538,2.054,0.746,3.093c0.016,0.23,0.031,0.475,0.057,0.833c0.02,0.536-0.021,1.077-0.041,1.612
			c-0.01,0.045-0.035,0.15-0.051,0.203c-0.314-0.053-2.468,1.498-1.59,1.331c-1.63,0.604-3.326,1.03-5.017,1.409
			c-0.808,0.183-1.874,0.312-3.082,0.406c-1.574-1.141-3.529-1.993-6.038-2.336c-75.291-10.336-150.897-9.422-226.528-3.499
			c-1.364,0.109-2.595,0.406-3.761,0.779c-7.373-0.104-12.075-3.682-15.157-11.263C106.564,96.885,108.057,95.138,110.845,92.726z"
      />
      <path
        d="M186.387,186.935c-0.178-19.128-29.853-19.144-29.681,0c0.437,47.81,5.949,95.075,11.873,142.453
			c2.338,18.732,32.044,18.961,29.681,0C192.332,282.005,186.824,234.744,186.387,186.935z"
      />
      <path
        d="M248.712,183.967c-1.026-19.032-30.709-19.136-29.681,0c2.829,52.483,4.723,105.01,10.39,157.293
			c2.039,18.819,31.738,19.017,29.681,0C253.434,288.977,251.536,236.45,248.712,183.967z"
      />
      <path
        d="M284.857,186.427c7.993,58.711,4.169,118.058,3.92,177.089c-0.081,19.139,29.595,19.134,29.681,0
			c0.26-61.896,3.393-123.445-4.98-184.983C310.902,159.648,282.308,167.723,284.857,186.427z"
      />
    </svg>
  </Icon>
);

export default Messages;
