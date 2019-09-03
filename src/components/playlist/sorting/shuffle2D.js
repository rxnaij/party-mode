import shuffle from './shuffle'

// The order of users and order of songs is randomly selected.
// However, the list is guaranteed to be organized in a way
// that alternates across users, such that each user is guaranteed
// to go at least once every cycle.
export default function shuffle2D (array_2D) {

  let maxWidth = 0; // Maximum number of songs in list

  // Shuffles order of rows in array
  const array_2D_shuffledRows = shuffle(array_2D);

  // Shuffles order of columns in each row
  const array_2D_shuffled = array_2D_shuffledRows.map(row => {

    if (row.length > maxWidth) {
      maxWidth = row.length;
    }

    const shuffledRow = shuffle(row);
    return shuffledRow;
  });

  const arrayAndMaxWidth = [array_2D_shuffled, maxWidth]

  return arrayAndMaxWidth;
}