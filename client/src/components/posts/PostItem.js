import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import classNames from "classnames";
import { Link } from "react-router-dom";
import {
  deletePost,
  likePost,
  removelikePost
} from "../../actions/postActions";

class PostItem extends Component {
  onClickDelete(id) {
    this.props.deletePost(id);
  }
  onLikeClick(id) {
    this.props.likePost(id);
  }
  removeLikeClick(id) {
    this.props.removelikePost(id);
  }
  //check user already like the post
  findUserLike(likes) {
    const { auth } = this.props;
    if (likes.filter(like => like.user === auth.user.id).length > 0) {
      return true;
    } else {
      return false;
    }
  }
  render() {
    const { post, auth, showActions } = this.props;
    return (
      <div className="card card-body mb-3">
        <div className="row">
          <div className="col-md-2">
            <a href="profile.html">
              <img
                className="rounded-circle d-none d-md-block"
                src={post.avatar}
                alt=""
              />
            </a>
            <br />
            <p className="text-center">{post.name}</p>
          </div>
          <div className="col-md-10">
            <p className="lead">{post.text}</p>
            {showActions ? (
              <span>
                <button
                  onClick={this.onLikeClick.bind(this, post._id)}
                  type="button"
                  className="btn btn-light mr-1"
                >
                  <i
                    className={classNames("fas fa-thumbs-up", {
                      "text-success": this.findUserLike(post.likes)
                    })}
                  />
                  <span className="badge badge-light">{post.likes.length}</span>
                </button>
                <button
                  onClick={this.removeLikeClick.bind(this, post._id)}
                  type="button"
                  className="btn btn-light mr-1"
                >
                  <i className="text-danger fas fa-thumbs-down" />
                </button>
                <Link to={`/post/${post._id}`} className="btn btn-info ml-1">
                  Comments
                </Link>
                {post.user === auth.user.id ? (
                  <button
                    type="button"
                    onClick={this.onClickDelete.bind(this, post._id)}
                    className="btn btn-danger ml-2"
                  >
                    <i className="fas fa-times" />
                  </button>
                ) : null}
              </span>
            ) : null}
          </div>
        </div>
      </div>
    );
  }
}

PostItem.defaultProps = {
  showActions: true
};

PostItem.propTypes = {
  post: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  deletePost: PropTypes.func.isRequired,
  likePost: PropTypes.func.isRequired,
  removelikePost: PropTypes.func.isRequired
};
const mapStateToProp = state => {
  return {
    auth: state.auth
  };
};
export default connect(
  mapStateToProp,
  { deletePost, likePost, removelikePost }
)(PostItem);
