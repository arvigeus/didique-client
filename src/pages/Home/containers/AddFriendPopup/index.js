import Popup from "components/Popup";
import React from "react";
import AddInfo from "./AddInfo";

const AddFriendPopup = ({ cancel }) => (
  <Popup title="Add friend" cancel={cancel}>
    <AddInfo onSubmit={() => {}} />
  </Popup>
);

export default AddFriendPopup;
