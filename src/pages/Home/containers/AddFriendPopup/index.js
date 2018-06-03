import React from "react";
import AddInfo from "./AddInfo";
import ConnectFriend from "./ConnectFriend";

class AddFriendPopup extends React.PureComponent {
  state = {
    friend: null
  };

  render() {
    const { cancel } = this.props;
    const { friend } = this.state;

    return !friend ? (
      <AddInfo
        onSubmit={friend => {
          console.log(friend);
          this.setState({ friend });
        }}
        cancel={cancel}
      />
    ) : (
      <ConnectFriend friend={friend} cancel={cancel} />
    );
  }
}

export default AddFriendPopup;
