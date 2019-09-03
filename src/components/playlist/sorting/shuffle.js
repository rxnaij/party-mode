export default function shuffle (array) {
  let m = array.length;
  let t, i;

  // While there remains elements to shuffle...
  while (m) {

    // Pick a remaining element randomly...
    i = Math.floor(Math.random() * m--);
      // i = random element in array
      // m = number of unshuffled elements left in array

    // And swap it with the current element.
    t = array[m]; // t = element at end of unshuffled elements in front of array
      // swaps last unshuffled element with random element
    array[m] = array[i]; 
    array[i] = t;
  }

  return array;
}