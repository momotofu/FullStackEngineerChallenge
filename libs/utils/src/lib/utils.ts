/**
 * 
 * @param promise 
 * 
 * Takes a Promise and returns its resloved or rejected values in an array.
 */
export function handle(promise) {
  console.log('promise: ', promise);
  return promise
    .then(data => ([data, undefined]))
    .catch(error => Promise.resolve([undefined, error]));
}