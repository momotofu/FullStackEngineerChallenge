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

// Returns a Review object used to create a Review Entity
export function createEmployee(
  name,
  email,
  bio,
  photoURL,
  passwordHash,
  isAdmin,
  reviews = [],
): object {
  return {
    name: name,
    email: email, 
    bio: bio,
    photoURL: photoURL,
    passwordHash: passwordHash,
    isAdmin: isAdmin,
    reviews: reviews,
  };
}

// Returns a Review object used to create a Review Entity
export function createReview(
  isComplete,
  learnFromMistakes,
  madeGoodEffort,
  communication,
  friendliness,
  problemSolving,
  reliability,
  somethingNice,
  otherObservations,
  ownedBy,
): object {
  return {
  isComplete: isComplete,
  learnFromMistakes: learnFromMistakes,
  madeGoodEffort: madeGoodEffort,
  communication: communication,
  friendliness: friendliness,
  problemSolving: problemSolving,
  reliability: reliability,
  somethingNice: somethingNice,
  otherObservations: otherObservations,
  assignedTo: null,
  ownedBy: ownedBy,
  };
}