import React, { Component } from "react";
import PropTypes from "prop-types";

class ProfileGitHub extends Component {
  constructor(props) {
    super(props);
    this.state = {
      clientID: "82d449b84debd94157ab",
      clientSecret: "c9db886169345f94853bd2e6718c0378c0f385a4",
      count: 5,
      sort: "created:asc",
      repos: []
    };
  }
  componentDidMount() {
    const { username } = this.props;
    const { clientId, clientSecret, sort, count } = this.state;
    fetch(
      `https://api.github.com/users/${username}/repos?per_page=${count}&sort=${sort}&client_id=${clientId}&client_secret=${clientSecret}`
    )
      .then(res => res.json())
      .then(data => {
        this.setState({
          repos: data
        });
      });
  }
  render() {
    const { repos } = this.state;
    const repoItems = repos.map(repo => (
      <div key={repo.id} className="card card-body mb-2">
        <div className="row">
          <div className="col-md-6">
            <h4>
              <a href={repo.html_url} className="text-info" target="_blank">
                {repo.name}
              </a>
            </h4>
            <p>{repo.description}</p>
          </div>
          <div className="col-md-6">
            <span className="badge badge-info mr-1">
              Stars: {repo.stargazers_count}
            </span>
            <span className="badge badge-warning mr-1">
              Watchers: {repo.watchers_count}
            </span>
            <span className="badge badge-success mr-1">
              Forks: {repo.forks_count}
            </span>
          </div>
        </div>
      </div>
    ));
    return (
      <div>
        <hr />
        <h3 className="mb-4">Latest Github Repos</h3>

        {repoItems}
      </div>
    );
  }
}

ProfileGitHub.propTypes = {
  username: PropTypes.string.isRequired
};
export default ProfileGitHub;
