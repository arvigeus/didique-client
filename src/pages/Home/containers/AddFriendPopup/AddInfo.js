import Button from "components/Input/Button";
import Field from "components/Input/Field";
import Picture from "components/Picture";
import Popup from "components/Popup";
import normalizeErrors from "lib/normalizeErrors";
import React from "react";
import { Mutation } from "react-apollo";
import addFriendQuery from "../../graphql/addFriend.graphql";
import friendsQuery from "../../graphql/friends.graphql";
import styles from "./AddInfo.module.css";

class AddInfo extends React.PureComponent {
  state = {
    errors: {}
  };

  render() {
    const { onSubmit, cancel } = this.props;
    const { errors } = this.state;
    return (
      <Mutation
        mutation={addFriendQuery}
        update={(
          cache,
          {
            data: {
              addFriend: { ok, friend, errors }
            }
          }
        ) => {
          if (!ok) {
            this.setState({ errors: normalizeErrors(errors) });
            return;
          }
          const { friends } = cache.readQuery({
            query: friendsQuery,
            variables: { query: "" }
          });
          friends.push(friend);
          cache.writeQuery({
            query: friendsQuery,
            data: { friends },
            variables: { query: "" }
          });
        }}
        onError={err => {
          this.setState({ errors: normalizeErrors(err) });
        }}
        onCompleted={({ addFriend: { ok, friend } }) => {
          if (ok) {
            if (friend.email) onSubmit(friend);
            else cancel(); // if no email is provided, close the popup
          }
        }}
      >
        {addFriend => (
          <Popup title="Add friend" cancel={cancel}>
            <form
              onSubmit={e => {
                e.preventDefault();
                addFriend({
                  variables: {
                    name: e.target.name.value,
                    email: e.target.email.value
                  },
                  refetchQUeries: ["friends"]
                });
                return false;
              }}
              className={styles.wrapper}
            >
              <Picture className={styles.picture} />
              <Field
                id="name"
                name="name"
                label="Name"
                className={styles.name}
                required
                title="Please enter a name"
                error={
                  errors.name && errors.name.length ? errors.name[0] : null
                }
              />
              <Field
                id="email"
                name="email"
                label="Email"
                type="email"
                className={styles.email}
                title="Please enter a valid email"
                error={
                  errors.email && errors.email.length ? errors.email[0] : null
                }
              />
              {errors[undefined] && errors[undefined].length ? (
                <ul className={styles.error}>
                  {errors[undefined].map((error, idx) => (
                    <li key={idx}>{error}</li>
                  ))}
                </ul>
              ) : null}
              <Button type="submit" value="Submit" className={styles.submit} />
            </form>
          </Popup>
        )}
      </Mutation>
    );
  }
}

export default AddInfo;
