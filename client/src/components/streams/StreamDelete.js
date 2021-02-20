import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import { fetchStream, deleteStream } from "../../actions";
import history from "../../history";
import Modal from "../Modal";

class StreamDelete extends React.Component {
  componentDidMount() {
    this.props.fetchStream(this.props.match.params.id); // this id came from <Route component={}> <Route> passes props to its wired component
  }

  // <React.Fragment> => shoter syntax <> </> just empty tag
  renderActions() {
    return (
      <React.Fragment>
        {/** We dont want a div bcz it occupy some space and styling goes wrong so new feature React.Fragment*/}
        <button
          onClick={() => this.props.deleteStream(this.props.match.params.id)} // here in on click we pass ()=>{} bcz we have to pass id to action creator
          className="ui button negative"
        >
          Delete
        </button>
        <Link to="/" className="ui button">
          Cancel
        </Link>
      </React.Fragment>
    );
  }

  renderContent() {
    if (!this.props.stream) {
      return "Are you sure you want to delete this stream?";
    }
    return `Are you sure you want to delete the stream with title: ${this.props.stream.title}`;
  }

  render() {
    return (
      <Modal
        title="Delete Stream"
        content={this.renderContent()}
        actions={this.renderActions()}
        onDismiss={() => history.push("/")}
      />
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return { stream: state.streams[ownProps.match.params.id] };
};

export default connect(mapStateToProps, { fetchStream, deleteStream })(
  StreamDelete
);
