var clientId = '1070442693955-evsq86lrnb44948sefo96imiubpvg233.apps.googleusercontent.com';
var apiKey = 'AIzaSyDmJdXugAJJiyFAEzrWG0K8gpI0_4RieNQ';
var scopes = 'https://www.googleapis.com/auth/gmail.send';

//client secret: iTmIXt5gBi6HnzVrNc4qZhOM

function handleClientLoad() {
  gapi.client.setApiKey(apiKey);
  window.setTimeout(checkAuth,1);
}

function checkAuth() {
  gapi.auth.authorize({client_id: clientId, scope: scopes, immediate: true}, handleAuthResult);
}

function handleAuthResult(authResult) {
  var authorizeButton = document.getElementById('authorize-button');
  if (authResult && !authResult.error) {
    authorizeButton.style.visibility = 'hidden';
    makeApiCall();
  } else {
    authorizeButton.style.visibility = '';
    authorizeButton.onclick = handleAuthClick;
  }
}

function handleAuthClick(event) {
  gapi.auth.authorize({client_id: clientId, scope: scopes, immediate: false}, handleAuthResult);
  return false;
}