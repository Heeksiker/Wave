import React, { useEffect, useState } from 'react';
import { getAuthUrl, getToken } from './auth'; // Asegúrate de ajustar la ruta según tu estructura de archivos
import './SpotifyPlayer.css';

const SpotifyPlayer = () => {
  const [token, setToken] = useState('');
  const [currentTrack, setTrack] = useState({});
  const [deviceId, setDeviceId] = useState('');

  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://sdk.scdn.co/spotify-player.js';
    script.async = true;
    document.body.appendChild(script);

    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get('code');

    if (!code) {
      window.location.href = getAuthUrl();
    } else {
      getToken(code).then(token => {
        setToken(token);

        window.onSpotifyWebPlaybackSDKReady = () => {
          const player = new window.Spotify.Player({
            name: 'Wave Spotify Player',
            getOAuthToken: cb => { cb(token); },
            volume: 0.5
          });

          player.addListener('ready', ({ device_id }) => {
            console.log('Ready with Device ID', device_id);
            setDeviceId(device_id);
          });

          player.addListener('not_ready', ({ device_id }) => {
            console.log('Device ID has gone offline', device_id);
          });

          player.addListener('player_state_changed', (state => {
            if (!state) {
              return;
            }

            setTrack(state.track_window.current_track);

            player.getCurrentState().then(state => {
              if (!state) {
                setTrack({});
              }
            });
          }));

          player.connect();
        };
      });
    }
  }, []);

  const handlePlay = () => {
    fetch(`https://api.spotify.com/v1/me/player/play?device_id=${deviceId}`, {
      method: 'PUT',
      body: JSON.stringify({ uris: ['spotify:track:0GiwV6v3AgJfdu59tj719Y'] }), // Reemplaza con la URI de la pista de Spotify
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
    });
  };

  const handlePause = () => {
    fetch(`https://api.spotify.com/v1/me/player/pause?device_id=${deviceId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
    });
  };

  return (
    <div className="spotify-player">
      <h2>Reproductor de Spotify</h2>
      <div>
        <img src={currentTrack.album ? currentTrack.album.images[0].url : ''} alt="Album cover" />
        <div>
          <h3>{currentTrack.name}</h3>
          <p>{currentTrack.artists ? currentTrack.artists[0].name : ''}</p>
        </div>
      </div>
      <div>
        <button onClick={handlePlay}>Play</button>
        <button onClick={handlePause}>Pause</button>
      </div>
      <iframe
        title="Spotify Embed: Recommendation Playlist"
        src={`https://open.spotify.com/embed/track/0GiwV6v3AgJfdu59tj719Y?utm_source=generator&theme=0`}
        width="100%"
        height="100%"
        style={{ minHeight: '360px' }}
        frameBorder="0"
        allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
        loading="lazy"
      />
    </div>
  );
};

export default SpotifyPlayer;