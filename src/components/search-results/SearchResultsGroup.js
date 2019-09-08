import React from 'react';
import TrackSearchResult from './TrackSearchResult';
import AlbumSearchResult from './AlbumSearchResult';
import ArtistSearchResult from './ArtistSearchResult';




/*
 *
 * props:
 * users: list of users in parent
 * searchResults: list of search results from query
 * addSong(): adds track to current user's song list
 * openDuplicateModal(): triggers popup asking if duplicate song is OK
 */ 
export default function SearchResultsGroup (props) {

  // Destructuring props
  const { addSongCallbacks, getAlbumTracks, getArtistResults, retrievedData, retrievedDataType } = props;

  const SearchResults = props => {
    const { data, itemsToShow } = props;
    const { tracks, albums, artists } = data;

    return (
      <div>
        <h3>Tracks</h3>
        {
          tracks && tracks.items.length > 0 ? (
            tracks.items.slice(0, itemsToShow).map(track => 
              <TrackSearchResult
                key={track.id}
                item={track}
                addSongCallbacks={addSongCallbacks}
              />
            )
          ) : (
            <div>
              No results for tracks
            </div>
          )
        }
        <h3>Albums</h3>
        {
          albums && albums.items.length > 0 ? (
            albums.items.slice(0, itemsToShow).map(album =>
              <AlbumSearchResult
                key={album.id}
                item={album}
                getAlbumTracks={getAlbumTracks}
              />
            )
          ) : (
            <div>
              No results for albums
            </div>
          )
        }
        <h3>Artists</h3>
        {
          artists && albums.items.length > 0 ? (
            artists.items.slice(0, itemsToShow).map(artist =>
              <ArtistSearchResult 
                key={artist.id}
                item={artist}
                getArtistResults={getArtistResults}
              />
            )
          ) : (
            <div>
              No results for artists
            </div>
          )
        }
      </div>
    );
  }

  const renderArtist = () => {

  }

  /*
   * 
   * 
   */ 
  const AlbumTracks = props => {
    const { data } = props;

    return(
      data.tracks.map(track =>
        <TrackSearchResult
          key={track.id}
          item={track}
          addSongCallbacks={addSongCallbacks}
        />
      )
    );
  }

  const ArtistAlbumsAndTopTracks = props => {
    const { data } = props;

    const { topTracks, albums } = data;

    console.log(data)

    return(
      <div>
        <h3>Top Tracks</h3>
        {
          topTracks.tracks.slice(0,5).map(track => 
            <TrackSearchResult
              key={track.id}
              item={track}
              addSongCallbacks={addSongCallbacks}
            />
          )
        }
        <h3>Albums</h3>
        {
          albums.items.map(album => 
            <AlbumSearchResult 
              key={album.id}
              item={album}
              getAlbumTracks={getAlbumTracks}
            />
          )
        }
      </div>
    )



  }

  console.log(retrievedDataType)

  return (
    retrievedData ? (
      <div>
        {
          retrievedDataType === 'search' && 
          <SearchResults data={retrievedData} itemsToShow={5} />
        }
        {
          retrievedDataType === 'album' &&
          <AlbumTracks data={retrievedData} getAlbumTracks={getAlbumTracks} />
        }
        {
          retrievedDataType === 'artist' &&
          // Render artist section
          <ArtistAlbumsAndTopTracks data={retrievedData} getAlbumTracks={getAlbumTracks} />
        }
      </div>
    ) : (
      <div>
        <p>Start typing above to search for your favorite tracks, albums, and artists.</p>
      </div>
    )
  );
}