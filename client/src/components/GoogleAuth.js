import React from "react";
import { connect } from "react-redux";

import { signIn, signOut } from "../actions";

class GooleAuth extends React.Component {
  componentDidMount() {
    window.gapi.load("client:auth2", () => {
      window.gapi.client
        .init({
          clientId:
            "798192505076-4r3jfrs6gd8linf4daraddhidf9gc1vp.apps.googleusercontent.com",
          scope: "email",
        })
        .then(() => {
          this.auth = window.gapi.auth2.getAuthInstance();
          // initialization
          this.onAuthChange(this.auth.isSignedIn.get()); // this is imp bcz we refrese this value get set
          this.auth.isSignedIn.listen(this.onAuthChange);
        });
    });
  }

  // isSignedIn (true/false) is recevied internally ny this google lib when we did that ,listen(this.onAuthChange)
  onAuthChange = (isSignedIn) => {
    // console.log(isSignedIn)
    if (isSignedIn) {
      // we pass id bcz we want a track of current user in our state so we passed to action creator from that we get this id to our reducer so from that we will add this id to state
      this.props.signIn(this.auth.currentUser.get().getId()); // under the hood this call dispatch woth signIn action creatoor
    } else {
      this.props.signOut();
    }
  };

  onSignInClick = () => {
    this.auth.signIn();
  };

  onSignOutClick = () => {
    this.auth.signOut();
  };

  renderAuthButton() {
    if (this.props.isSignedIn === null) {
      return null;
    } else if (this.props.isSignedIn) {
      return (
        <button onClick={this.onSignOutClick} className="ui red google button">
          <i className="google icon"></i>
          Sign Out
        </button>
      );
    } else {
      return (
        <button onClick={this.onSignInClick} className="ui red google button">
          <i className="google icon"></i>
          Sign In With Google
        </button>
      );
    }
  }

  render() {
    return <div>{this.renderAuthButton()}</div>;
  }
}

const mapStateToProps = (state) => {
  return { isSignedIn: state.auth.isSignedIn };
};

export default connect(mapStateToProps, { signIn, signOut })(GooleAuth);
