const clientId = '6ee486d0dda446f0b0b035541b8dfd43'; // Reemplaza con tu Client ID
const clientSecret = '9aab4ecb4e3f4f61abdc589e6cb38d10'; // Reemplaza con tu Client Secret
const redirectUri = 'http://localhost:3000/callback'; // Cambia esto si tu aplicación está en otro puerto o dominio

const scopes = [
  'user-read-playback-state',
  'user-modify-playback-state',
  'user-read-currently-playing',
];

export const getAuthUrl = () => {
  const authUrl = new URL('https://accounts.spotify.com/authorize');
  authUrl.searchParams.append('client_id', clientId);
  authUrl.searchParams.append('response_type', 'code');
  authUrl.searchParams.append('redirect_uri', redirectUri);
  authUrl.searchParams.append('scope', scopes.join(' '));
  return authUrl.toString();
};

export const getToken = async (code) => {
  const response = await fetch('https://accounts.spotify.com/api/token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': 'Basic ' + btoa(clientId + ':' + clientSecret),
    },
    body: new URLSearchParams({
      grant_type: 'authorization_code',
      code: code,
      redirect_uri: redirectUri,
    }),
  });

  const data = await response.json();
  return data.access_token;
};