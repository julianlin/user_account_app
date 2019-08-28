function getCurrentUserInfo(that) {
  fetch('/get_current_user_info')
    .then(function(response) {
      return response.json();
    })
    .then(function(json) {
      that.setState({
        email: json.email,
        firstName: json.first_name,
        lastName: json.last_name,
        isAdmin: json.is_admin
      })
    });
}

export default getCurrentUserInfo;