// @flow
import React from "react";
import Icon from "./Icon";

type NotesPropType = {
  size: number,
  className?: string,
  link?: string,
  badge?: number,
  badgeClass?: string
};

const Notes = ({ size, className, link, badge, badgeClass }: NotesPropType) => (
  <Icon className={className} link={link} badge={badge} badgeClass={badgeClass}>
    <svg
      xmlns="http://www.w3.org/2000/svg"
      version="1.1"
      x="0px"
      y="0px"
      width={`${size}px`}
      height={`${size}px`}
      viewBox="0 0 188.277 188.276"
    >
      <path d="M179.923,102.533c-2.245-7.919-9.83-12.912-17.867-13.02c-0.473-1.345-1.875-2.274-3.35-1.192 c-13.36,9.804-23.357,23.465-33.963,36.017c-8.394,9.934-16.167,21.491-26.777,29.185c-0.923,0.669-1.165,1.851-0.897,2.823 c-0.67,0.147-1.263,0.593-1.459,1.402c-2.291,9.41-4.807,18.361-8.395,27.384c-0.787,1.979,1.438,3.393,3.107,3.108 c10.414-1.771,19.201-8.848,27.51-14.909c0.978-0.714,1.237-1.776,1.042-2.727c9.133-7.886,17.001-17.489,25.831-25.743 c8.812-8.237,17.416-16.647,26.328-24.769C175.438,116.079,181.818,109.216,179.923,102.533z M123.248,133.823 c10.815-13.884,22.813-29.328,36.75-40.315c0.18,0.098,0.361,0.196,0.597,0.242c2.299,0.444,4.388,0.981,6.315,1.793 c-0.015,0.02-0.031,0.033-0.045,0.054c-10.618,15.382-25.27,27.319-37.324,41.497c-4.833,5.685-10.248,10.866-15.184,16.465 c-2.191,2.485-5.558,5.965-6.282,9.521c-1.301-3.281-4.279-5.104-8.007-5.44C109.684,153.875,117.167,141.627,123.248,133.823z M102.893,177.656c-0.848-1.446-1.865-2.816-3.213-3.831c-1.05-0.791-1.747-0.794-2.763-0.664 c1.272-4.172,2.207-8.426,2.573-12.733c2.987,0.615,5.16,2.377,5.261,5.815c0.034,1.147,0.893,1.95,2.015,2.015 c2.461,0.143,4.054,1.153,5.169,3.131C109.014,173.548,106.019,175.732,102.893,177.656z M168.939,114.863 c-5.386,5.575-11.518,10.583-17.083,16.003c-11.677,11.373-28.154,22.443-35.346,37.604c-0.399,0.021-0.822,0.153-1.25,0.467 c-0.001,0.001-0.003,0.002-0.003,0.002c-1.276-2.146-3.148-3.5-5.416-4.179c3.705-3.404,6.681-8.345,10.083-12.056 c4.806-5.244,9.958-10.181,14.407-15.742c11.14-13.923,25.797-24.507,35.812-39.444c0.028-0.042,0.042-0.082,0.066-0.123 c1.272,0.919,2.467,2.042,3.576,3.511C177.541,105.876,172.127,111.564,168.939,114.863z" />
      <path d="M164.63,78.044c-2.125-11.667-3.531-23.314-2.794-35.183c0.533-8.574,2.049-16.991,1.834-25.616 C163.284,1.739,152.11,0.69,138.986,0.228c-18.695-0.659-37.752,0.289-56.44,0.643C66.349,1.176,48.739,0.185,32.825,3.466 c-5.841,1.204-8.27,5.384-9.123,10.463c-4.847,1.574-11.288,4.359-12.838,9.518c-1.375,4.573,2.37,7.125,6.589,8.385 c-6.033,5.426-4.993,17.719,1.463,21.706c-7.534,4.383-6.401,13.285-0.959,17.823c-5.994,2.549-9.178,8.454-8.019,14.913 c0.687,3.836,3.207,6.667,6.408,8.161c-6.175,2.34-9.974,8.756-7.641,15.307c1.15,3.229,3.904,6.076,7.13,7.56 c-0.444,0.217-0.898,0.409-1.327,0.654c-5.674,3.235-7.272,9.488-4.748,15.239c1.202,2.74,3.371,4.814,5.95,6.191 c-4.708,2.805-7.849,7.897-6.898,13.617c1.332,8.015,10.471,11.117,17.488,9.874c0.461,0.865,1.012,1.65,1.687,2.316 c4.907,4.849,12.354,4.699,18.851,5.169c11.834,0.856,23.594,2.689,35.477,3.131c2.757,0.102,3.083-3.834,0.627-4.635 c-9.533-3.107-19.651-2.315-29.44-4.047c-6.197-1.098-19.385,1.255-22.1-6.24c-1.344-3.712-0.552-8.624-0.509-12.5 c0.008-0.78-0.01-1.562-0.018-2.343c1.736,0.683,3.395,1.54,4.893,2.447c1.631,0.989,3.188,2.257,4.194,3.895 c0.929,1.513-1.057,2.237-1.639,3.5c-0.691,1.503,0.144,3.017,1.812,3.158c2.636,0.222,4.87-2.341,5.224-4.816 c0.426-2.981-1.322-5.489-3.359-7.481c-2.854-2.795-6.962-5.103-11.258-6.347c-0.115-3.113-0.253-6.227-0.282-9.332 c-0.024-2.568-0.012-5.138,0.004-7.707c1.278,0.4,2.518,0.917,3.683,1.536c2.392,1.271,4.303,3.19,5.685,5.494 c1.219,2.032,0.625,4.209,1.253,6.352c0.579,1.977,2.888,1.967,3.995,0.522c4.268-5.57-2.932-13.353-7.195-16.31 c-2.256-1.565-4.76-2.609-7.357-3.176c0.081-5.242,0.222-10.485,0.377-15.727c1.758,0.542,3.453,1.256,5.026,2.103 c1.765,0.95,3.29,2.246,4.348,3.951c1.248,2.012-0.113,3.951,0.055,6.048c0.123,1.536,1.873,3.014,3.382,1.94 c6.085-4.325,1.028-12.323-3.349-15.608c-2.64-1.981-5.885-3.321-9.29-4.104c0.036-1.139,0.068-2.279,0.104-3.418 c0.144-4.523,0.305-9.034,0.436-13.538c1.375,0.552,2.682,1.186,3.823,1.838c1.881,1.074,3.493,2.529,4.621,4.38 c1.333,2.186,0.102,4.219,0.16,6.505c0.055,2.156,2.483,2.991,4.028,1.668c5.702-4.884-0.115-13.078-4.436-16.356 c-2.243-1.702-5.056-3.088-8.046-3.982c0.101-4.955,0.128-9.904,0.025-14.853c6.091,1.499,11.067,7.185,10.527,13.961 c-0.277,3.478,5.155,3.462,5.414,0c0.778-10.413-7.023-17.739-16.096-19.072c-0.178-4.303-0.473-8.606-0.939-12.916 c-0.131-1.206-0.251-2.413-0.372-3.62c2.664,0.46,5.276,1.395,7.587,2.621c1.692,0.897,3.574,2.252,4.323,4.092 c0.81,1.99-0.63,3.862-1.332,5.649c-0.957,2.436,2.347,3.657,3.964,2.308c5.353-4.468,2.745-11.938-2.166-15.418 c-3.676-2.605-8.243-4.247-12.864-4.744c-0.29-3.785-0.474-7.577-0.421-11.377c3.917-0.886,8.107-1.235,11.94-0.232 c5.711,1.494,3.23,5.677,2.981,9.922c-0.124,2.108,2.903,3.462,4.303,1.782c4.24-5.085,2.428-13.411-3.552-16.101 c-4.419-1.987-9.615-1.89-14.517-0.989c1.873-3.46,5.954-3.675,11.709-4.167c30.575-2.613,61.938-1.869,92.614-1.846 c6.269,0.005,12.778,0.111,18.823,1.916c6.228,1.86,3.963,15.525,3.591,20.322c-1.361,17.596-1.597,33.692,1.62,51.216 C159.619,83.362,165.308,81.769,164.63,78.044z M15.832,24.604c1.209-2.479,4.49-4.009,7.473-5.044 c0.025,3.302,0.394,6.666,0.708,9.637c-0.555,0.065-1.114,0.116-1.658,0.22c-1.773-0.804-3.539-1.634-5.166-2.686 C15.855,25.869,15.556,25.169,15.832,24.604z M24.48,34.558c0.448,5.583,0.781,11.139,0.98,16.677 c-0.373,0.06-0.744,0.141-1.115,0.223C17.21,48.602,16.169,36.038,24.48,34.558z M15.102,132.153 c-3.041-4.113-0.857-7.989,3.121-10.247c2.052-1.164,4.292-1.665,6.555-1.703c-0.067,5.634-0.094,11.268-0.036,16.904 c-0.983-0.028-1.944,0.026-2.88,0.146C19.245,136.102,16.867,134.54,15.102,132.153z M13.982,152.329 c-1.572-5.094,4.255-9.51,8.755-9.977c0.64-0.067,1.285-0.071,1.932-0.044c-0.258,5.184-0.948,12.071,0.417,17.378 C20.447,159.136,15.473,157.154,13.982,152.329z M24.851,114.979c-0.938,0.041-1.873,0.146-2.8,0.302 c-3.549-1.229-6.751-3.277-8.292-6.932c-2.404-5.703,3.345-9.248,8.331-9.668c1.041-0.087,2.095-0.077,3.15-0.006 C25.08,104.11,24.945,109.544,24.851,114.979z M25.383,93.305c-0.058-0.002-0.114,0-0.172-0.003 c-0.149-0.193-0.355-0.344-0.636-0.4c-4.246-0.856-7.874-3.056-9.233-7.325c-1.505-4.732,2.339-8.681,6.666-9.743 c1.183-0.29,2.439-0.336,3.715-0.226C25.667,81.481,25.547,87.371,25.383,93.305z M24.33,70.092 c-2.167-1.108-4.037-2.453-5.294-4.882c-1.596-3.085,0.571-5.978,3.146-7.509c1.108-0.659,2.254-1.116,3.408-1.408 c0.113,4.604,0.181,9.206,0.174,13.813C25.283,70.082,24.806,70.085,24.33,70.092z" />
      <path d="M166.97,159.02c-0.428-6.295,0.363-13.941-1.69-19.952c-0.305-0.891-0.99-1.795-1.982-1.981 c-4.514-0.85-3.396,4.515-3.155,7.185c0.561,6.174,1.094,12.622,1.029,18.815c-0.104,10.026-24.215,3.507-29.999,5.144 c-2.305,0.651-2.043,3.646,0,4.406c4.728,1.758,10.991,1.395,15.962,1.65c5.376,0.277,10.1,0.24,15.001-2.239 C167.079,169.549,167.296,163.812,166.97,159.02z" />
      <path d="M139.532,29.65c-1.224-0.753-2.012-0.996-3.04-0.94c-12.423-3.139-25.786-2.398-38.485-2.634 c-8.079-0.15-18.929-0.137-26.518,2.952c-1.682,0.684-2.228,3.54,0,3.975c8.018,1.567,17.072-0.506,25.194-0.645 c13.105-0.224,27.793-0.659,40.419,3.053C140.6,36.44,142.537,31.5,139.532,29.65z" />
      <path d="M139.635,52.072c-6.867-6.653-22.093-4.765-30.684-4.274c-12.704,0.726-26.396,2.271-38.747,5.395 c-2.151,0.544-1.507,3.482,0.495,3.659c10.838,0.953,22.49-1.542,33.294-2.474c6.368-0.549,12.717-0.875,19.108-0.652 c5.125,0.179,9.83,2.065,14.838,2.437C140.063,56.321,141.065,53.458,139.635,52.072z" />
      <path d="M138.345,74.544c-1.476-6.684-27.116-2.808-31.524-2.619c-8.619,0.369-17.242,0.819-25.837,1.565 c-3.643,0.316-9.462-0.172-12.607,2.058c-0.61,0.432-0.633,1.245,0,1.673c2.568,1.738,6.91,1.064,9.825,1.043 c7.718-0.056,15.434-0.262,23.147-0.514c7.404-0.241,14.814-0.454,22.224-0.536c2.829-0.032,5.657-0.016,8.483,0.105 c0.851,0.037,4.752,0.87,2.877-0.153C136.775,78.171,138.787,76.539,138.345,74.544z" />
      <path d="M105.095,95.577c-5.836-1.736-12.063-1.12-18.033-0.503c-5.367,0.555-12.231,0.378-17.251,2.311 c-0.863,0.332-1.023,1.366-0.249,1.907c3.556,2.482,9.479,1.317,13.529,1.104c6.948-0.368,13.592-0.596,20.454,0.811 C107.208,101.955,108.728,96.658,105.095,95.577z" />
    </svg>
  </Icon>
);

export default Notes;