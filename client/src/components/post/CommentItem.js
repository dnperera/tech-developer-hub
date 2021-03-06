import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { deleteComment } from "../../actions/postActions";

class CommentItem extends Component {
  onClickDelete(postId, commentId) {
    this.props.deleteComment(postId, commentId);
  }
  render() {
    const { comment, postId, auth } = this.props;
    return (
      <div className="card card-body mb-3">
        <div className="row">
          <div className="col-md-2">
            <a href="profile.html">
              <img
                className="rounded-circle d-none d-md-block"
                src={comment.avatar}
                alt=""
              />
            </a>
            <br />
            <p className="text-center">{comment.name}</p>
          </div>
          <div className="col-md-10">
            <p className="lead">{comment.text}</p>
            {comment.user === auth.user.id ? (
              <button
                type="button"
                onClick={this.onClickDelete.bind(this, postId, comment._id)}
                className="btn btn-danger ml-2"
              >
                <i className="fas fa-times" />
              </button>
            ) : null}
          </div>
        </div>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Vel reiciendis
        mollitia officia impedit eius magnam laudantium voluptatibus molestias
        tempore, excepturi molestiae tempora nam placeat dolores commodi quidem
        inventore sapiente animi.
      </div>
    );
  }
}

CommentItem.propTypes = {
  comment: PropTypes.object.isRequired,
  postId: PropTypes.string.isRequired,
  deleteComment: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};
const mapStateToProps = state => {
  return {
    auth: state.auth
  };
};
export default connect(
  mapStateToProps,
  { deleteComment }
)(CommentItem);
