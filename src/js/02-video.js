import Player from '@vimeo/player';
import throttle from 'lodash.throttle';

const iframe = document.getElementById('vimeo-player');
const player = new Player(iframe);

const LOCAL_STORAGE_KEY = 'videoplayer-current-time';

// folosim throttle pt a face updata la timpul curent din localStorage
const onTimeUpdate = throttle(function (event) {
  localStorage.setItem(LOCAL_STORAGE_KEY, event.seconds);
}, 1000);

// evenimentul de timeupdate care apeleaza functia onTimeUpdate
player.on('timeupdate', onTimeUpdate);

// Cand se reincarca pagina se verifica daca avem salvat curent time in localStorage si se seteaza acel timp de redare
const savedTime = localStorage.getItem(LOCAL_STORAGE_KEY);
if (savedTime) {
  player.setCurrentTime(parseFloat(savedTime));
}
