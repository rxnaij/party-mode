 import shuffle2D from './shuffle2D';
 import orderByColumn from './orderByColumn';
 
 /*
  *  Shuffles playlist to ensure that each user's songs alternate one after another 
  *
  *  tracks: 2D array of track objects, usually sorted by user
  */ 
export default function equalizeShufflePlaylist (tracks) {
  const [playlist_shuffledInPlace, maxWidth] = shuffle2D(tracks);
  const playlist_alternatingOrder = orderByColumn(playlist_shuffledInPlace, maxWidth);
  const playlist_shuffled = playlist_alternatingOrder.flat();

  return playlist_shuffled;
}