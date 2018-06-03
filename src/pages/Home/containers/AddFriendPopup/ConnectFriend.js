import Button from "components/Input/Button";
import Popup from "components/Popup";
import React from "react";
import { Mutation } from "react-apollo";
import connectFriendQuery from "../../graphql/connectFriend.graphql";
import styles from "./ConnectFriend.module.css";
import Toggle from "components/Input/Toggle";
import normalizeErrors from "lib/normalizeErrors";

class ConnectFriend extends React.PureComponent {
  state = {
    errors: {}
  };

  render() {
    const {
      friend: {
        name,
        email,
        stats: { isOnline }
      },
      cancel
    } = this.props;
    const { errors } = this.state;

    const isRegistered = isOnline !== null;

    return (
      <Mutation
        mutation={connectFriendQuery}
        onError={err => {
          this.setState({ errors: normalizeErrors(err) });
        }}
        onCompleted={({ connectFriend: { ok, errors } }) => {
          if (ok) cancel();
          else this.setState({ errors: normalizeErrors(errors) });
        }}
      >
        {connectFriend => (
          <Popup title="Connect friend" cancel={cancel}>
            <form
              className={styles.form}
              onSubmit={e => {
                e.preventDefault();
                if (e.target.invite.checked)
                  connectFriend({
                    variables: {
                      email
                    }
                  });
                else cancel();
                return false;
              }}
            >
              <p>
                Your friend <em>{name}</em> is{" "}
                {isRegistered ? "already" : "not"} registered here.<br />
                Do you want to connect with them?
              </p>

              <Toggle
                id="invite-toggle"
                name="invite"
                label={
                  isRegistered
                    ? `Send friend request to ${name}`
                    : `Send invite to ${email}`
                }
                className={styles.toggle}
              />

              {errors[undefined] && errors[undefined].length ? (
                <ul className={styles.error}>
                  {errors[undefined].map((error, idx) => (
                    <li key={idx}>{error}</li>
                  ))}
                </ul>
              ) : null}
              <Button type="submit" value="Okay" />
              <Button value="Cancel" onClick={cancel} />
            </form>
          </Popup>
        )}
      </Mutation>
    );
  }
}

export default ConnectFriend;
