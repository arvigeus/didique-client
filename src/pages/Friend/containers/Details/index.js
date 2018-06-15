// import Handwriting from "components/Handwriting";
import Handwriting from "components/Handwriting";
import DateTime from "components/Input/DateTime";
import Field from "components/Input/Field";
import RadioGroup, { RadioOption } from "components/Input/RadioGroup";
import friendStore from "lib/friendStore";
import React from "react";
import { Query } from "react-apollo";
import { Redirect } from "react-router-dom";
import styles from "./Details.module.css";
import NameTage from "./components/NameTag";
import friendQuery from "./friend.graphql";

class Details extends React.PureComponent {
  render() {
    const {
      match: {
        params: { nickname }
      }
    } = this.props;
    return (
      <Query query={friendQuery} variables={{ nickname }}>
        {({ loading, error, data }) => {
          if (loading)
            return <Handwriting fontSize="50px">Loading details</Handwriting>;
          if (error) return <div>Error :(</div>;

          const { friend } = data;

          if (!friend)
            return (
              <Redirect
                to={{
                  pathname: "/"
                }}
              />
            );

          const {
            id,
            name,
            nickname,
            email,
            dateOfBirth,
            gender,
            phone,
            country,
            city,
            address,
            occupation,
            description
          } = friend;

          return (
            <section className={styles.wrapper}>
              <NameTage
                name={name}
                formName="name"
                rotate={friendStore(id).nameTag}
                required
              />
              <Field
                type="text"
                id="nickname"
                name="nickname"
                label="Nickname"
                defaultValue={nickname}
                title="Please enter a alphanumeric nickname"
                pattern="^[A-Za-z0-9]+(?:-[A-Za-z0-9]+)*$"
                required
              />
              <Field
                type="email"
                id="email"
                name="email"
                label="Email"
                defaultValue={email}
                autoComplete="email"
                title="Please enter a valid email"
              />
              <DateTime
                id="birth-date"
                name="birth-date"
                label="Date of birth"
                defaultValue={dateOfBirth}
                required
              />
              <RadioGroup name="gender" label="Gender">
                <RadioOption
                  id="gender-male"
                  key="male"
                  label="Male"
                  name="gender"
                  defaultChecked={gender === "male"}
                />
                <RadioOption
                  id="gender-female"
                  key="female"
                  label="Female"
                  name="gender"
                  defaultChecked={gender === "female"}
                />
              </RadioGroup>
              <Field
                type="tel"
                id="phone"
                name="phone"
                label="Phone"
                defaultValue={phone}
              />
              <Field
                type="text"
                id="country"
                name="country"
                label="Country"
                defaultValue={country}
              />
              <Field
                type="text"
                id="city"
                name="city"
                label="City"
                defaultValue={city}
              />
              <Field
                type="text"
                id="address"
                name="address"
                label="Address"
                defaultValue={address}
              />
              <Field
                type="text"
                id="occupation"
                name="occupation"
                label="Occupation"
                defaultValue={occupation}
              />
              <Field
                type="textarea"
                id="description"
                name="description"
                label="Additional information"
                defaultValue={description}
              />
            </section>
          );
        }}
      </Query>
    );
  }
}

export default Details;
