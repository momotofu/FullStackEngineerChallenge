import bcrypt from 'bcrypt';

const employees = async () => {
  const data = [
    [
      'Christopher',
      '1@test.xyz',
      'Lives in Osaka Japan and loves Unagi-don.',
      'https://avatars3.githubusercontent.com/u/5377298?s=460&u=387ca2b2f800c4bca990b8dfc1e48acc9055d187&v=4',
      await genHash('peace'),
      true,
    ],
    [
      'Jasper',
      '12@test.xyz',
      'My name is the name of one of the three wise men that visited baby Jesus.',
      'https://st3.depositphotos.com/4111759/13425/v/450/depositphotos_134255626-stock-illustration-avatar-male-profile-gray-person.jpg',
      await genHash('12'),
      false,
    ],
    [
      'Ray',
      '123@test.xyz',
      'My personality is like a bright and colorful stream of light. My name has cool and kind kanji associated with it',
      'https://st3.depositphotos.com/4111759/13425/v/450/depositphotos_134255626-stock-illustration-avatar-male-profile-gray-person.jpg',
      await genHash('123'),
      false,
    ],
    [
      'Julian',
      '1234@test.xyz',
      'I was born in Fiji, and I learned how to program and meditate in the Tech Monestary.',
      'https://st3.depositphotos.com/4111759/13425/v/450/depositphotos_134255626-stock-illustration-avatar-male-profile-gray-person.jpg',
      await genHash('1234'),
      false,
    ],
  ]

  return data
};

// Returns an array of Employee objects to be used to create Employee entities.
export const getSeeds = async () => {
  const stubbedEmployess = await employees();

  // console.log(`st: ${stubbedEmployess}`);
  const seeds = [
    ['Employee', stubbedEmployess.map((emp) => {
        return createEmployee(...emp);
      })
    ]
  ];

  // console.log('seeds', seeds);
  return seeds;
}

// Returns a password hash using bycrypt
export async function genHash(password) {
  const saltRounds = 10;
  const hash = bcrypt.hash(password, saltRounds);
  return hash;
}

// Returns a Review object used to create a Review Entity
export function createEmployee(
  name,
  email,
  bio,
  photoURL,
  passwordHash,
  isAdmin,
) {
  return {
    name: name,
    email: email, 
    bio: bio,
    photoURL: photoURL,
    passwordHash: passwordHash,
    isAdmin: isAdmin,
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
) {
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