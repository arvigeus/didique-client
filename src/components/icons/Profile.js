// @flow
import React from "react";
import Icon from "./Icon";

type ProfilePropType = {
  size: number
};

const Profile = ({ size, ...props }: ProfilePropType) => (
  <Icon {...props}>
    <svg
      xmlns="http://www.w3.org/2000/svg"
      version="1.1"
      x="0px"
      y="0px"
      width={`${size}px`}
      height={`${size}px`}
      viewBox="0 0 489.483 489.483"
    >
      <path
        d="M488.08,101.755c0.005-11.164-10.908-15.26-18.967-12.322c-135.43,0.234-297.145,5.33-432.062,5.469
			c-0.493,0-0.924,0.099-1.389,0.14c-0.452-0.045-0.889-0.14-1.351-0.14c-6.759,0.005-13.477,0.333-20.099,1.861
			c-0.759,0.178-1.459,0.457-2.145,0.765c-0.132,0.043-0.262,0.094-0.391,0.142c-0.021,0.011-0.041,0.016-0.063,0.025
			c-4.745,1.727-8.604,5.807-8.838,12.287c-3.293,91.815-2.739,183.699-2.739,275.559c0,12.466,13.601,16.103,21.64,10.983
			c150.691,0.224,302.223,9.902,452.694-0.021c1.178-0.076,2.265-0.289,3.285-0.584c6.47-0.406,12.36-4.732,11.791-13.121
			C483.133,289.618,488.008,195.093,488.08,101.755z M27.443,369.128c-0.048-82.253-0.282-164.514,2.364-246.729
			c1.498-0.025,3.001-0.079,4.499-0.079c0.457,0,0.889-0.094,1.331-0.14c0.475,0.041,0.912,0.14,1.409,0.14
			c132.108-0.135,289.864-5.017,423.516-5.443c-0.488,84.096-4.021,169.018,0.762,252.962
			C317.068,378.284,171.884,369.565,27.443,369.128z"
      />
      <path
        d="M435.898,157.468c-0.441-4.037-3.25-7.8-8.475-7.889c-34.714-0.574-93.019,0.686-127.717,1.475
			c-4.306,0.1-6.891,2.715-7.941,5.878c-1.163,1.47-1.859,3.266-1.661,5.2c0.559,5.403,0.665,10.821,0.701,16.244
			c-0.65,40.36-0.838,116.167-2.174,156.511c-0.238,7.023,6.363,9.704,11.573,8.09c0.081,0.005,0.152,0.025,0.233,0.03
			c35.937,1.219,95.476-0.579,131.413-0.736c3.382-0.016,5.738-1.595,7.114-3.788c1.66-1.417,2.706-3.585,2.483-6.551
			c-3.448-45.469-4.413-126.439-5.17-172.017C436.269,159.022,436.111,158.222,435.898,157.468z M393.787,325.051
			c-18.332,0.259-38.893,0.543-57.26,0.579c0.178-23.618,4.85-50.597,25.07-63.551c0.808-0.188,1.62-0.355,2.376-0.757
			c2.981-1.569,6.638-1.432,10.105-0.727C395.071,273.22,396.041,301.952,393.787,325.051z M345.083,215.575
			c6.119-9.542,24.836-15.584,34.814-9.671c7.104,4.205,7.054,14.617,4.891,21.901c-0.427,0.432-0.823,0.909-1.193,1.467
			C372.571,245.917,333.754,233.244,345.083,215.575z M411.503,324.797c2.605-28.279-1.508-58.666-23.293-75.723
			c13.061-9.028,19.23-27.337,13.538-41.949c-0.046-0.114-0.091-0.224-0.137-0.338c-7.419-18.367-31.225-24.46-49.216-18.953
			c-23.811,7.289-30.936,36.3-17.326,55.398c2.818,3.958,6.454,6.955,10.552,9.092c-20.068,17.417-26.491,45.793-26.791,73.26
			c-4.362-0.041-8.471-0.102-12.228-0.198c1.025-35.586,1.31-106.625,1.854-142.221c0.04-0.366,0.111-0.713,0.111-1.102
			c0-1.224-0.041-2.439-0.046-3.661c0.016-0.993,0.025-1.985,0.046-2.98c0.005-0.333-0.066-0.607-0.092-0.919
			c-0.035-1.98-0.152-3.959-0.248-5.934c28.949-0.709,81.512-1.544,110.476-1.306c0.706,40.695,1.722,116.794,4.57,157.402
			C419.668,324.696,415.663,324.747,411.503,324.797z"
      />
      <path
        d="M78.177,185.379c53.923-2.25,107.849,1.592,161.767-0.686c14.092-0.6,14.147-22.531,0-21.932
			c-53.923,2.275-107.843-1.566-161.767,0.686C64.086,164.034,64.028,185.973,78.177,185.379z"
      />
      <path
        d="M249.544,216.225c-62.482,3.313-124.652-6.126-187.134-4.113c-14.106,0.452-14.152,22.392,0,21.935
			c62.482-2.014,124.652,7.419,187.134,4.113C263.607,237.416,263.678,215.476,249.544,216.225z"
      />
      <path
        d="M243.372,302.596c-58.077-0.345-116.009-5.697-174.106-4.113c-14.12,0.387-14.155,22.323,0,21.933
			c58.097-1.585,116.029,3.768,174.106,4.112C257.519,324.62,257.514,302.678,243.372,302.596z"
      />
    </svg>
  </Icon>
);

export default Profile;
