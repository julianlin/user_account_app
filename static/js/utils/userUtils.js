function getCurrentUserInfo() {
  fetch('/get_current_user_info')
  .then(function(response) {
    return response.json();
  })
  .then(function(json) {
    return JSON.stringify(json);
  }); 
}

export default getCurrentUserInfo;