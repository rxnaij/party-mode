/*
 * Reorders 2-dimensional array by column, then flattens it.
 *
 * array_2D: array to flatten
 * maxWidth: the maximum width of any row in array_2D
 */ 
export default function orderByColumn (array_2D, maxWidth) {

  let reordered = [];

  for (let col = 0; col < maxWidth; col++) { // New row based on column index
    
    reordered.push([]);

    for (let row = 0; row < array_2D.length; row++) { // New column value based on row index

      if (array_2D[row][col] || array_2D[row][col] === 0) { // safeguard if value is 0
        reordered[col].push(array_2D[row][col]);
      }

    }
  }

  return reordered;
}