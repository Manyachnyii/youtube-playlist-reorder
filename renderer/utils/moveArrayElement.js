export const moveArrayElement = (array, moveFromIndex, moveToIndex) => {
  let sliceStart, sliceEnd, slice;

  if (moveFromIndex > moveToIndex) {
    sliceStart = moveToIndex;
    sliceEnd = moveFromIndex;
    slice = array.slice(sliceStart, ++sliceEnd);
    slice.unshift(array[moveFromIndex]);
    slice.pop();
  } else if (moveFromIndex < moveToIndex) {
    sliceStart = moveFromIndex;
    sliceEnd = moveToIndex;
    slice = array.slice(sliceStart, ++sliceEnd);
    slice.push(array[moveFromIndex]);
    slice.shift();
  } else return array;

  const beforeSlice = array.slice(0, sliceStart);
  const afterSlice = array.slice(sliceEnd);

  const result = [...beforeSlice, ...slice, ...afterSlice];

  return result;
};
