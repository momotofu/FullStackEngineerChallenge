// Local imports
import { genHash } from './app/utils';

const employees = async () => {
  const data = [
    [
      'Mr. Boss',
      'admin@finalstage.com',
      'I love all my employees.',
      'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fcdn3.iconfinder.com%2Fdata%2Ficons%2Fcorporate-avatars-in-various-human-skin-tones-1%2F100%2FCorporate_Avatars_colour_44-01-512.png&f=1&nofb=1',
      await genHash('admin'),
      true,
    ],
    [
      'Christopher',
      '1@test.xyz',
      'I lives in Osaka Japan and loves Unagi-don.',
      'https://avatars3.githubusercontent.com/u/5377298?s=460&u=387ca2b2f800c4bca990b8dfc1e48acc9055d187&v=4',
      await genHash('1'),
      true,
    ],
    [
      'Jasper',
      '12@test.xyz',
      'My name is the name of one of the three wise men that visited baby Jesus.',
      'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.shareicon.net%2Fdata%2F2016%2F06%2F25%2F786552_people_512x512.png&f=1&nofb=1',
      await genHash('12'),
      false,
    ],
    [
      'Mizuho',
      '12345@mizmizworld.com',
      'I am working at my dream company PayPay! Please write me a good review.',
      'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fcdn3.iconfinder.com%2Fdata%2Ficons%2Favatars-flat%2F33%2Fwoman_9-512.png&f=1&nofb=1',
      await genHash('12345'),
      false,
    ],
    [
      'Ray',
      '123@test.xyz',
      'My personality is like a bright and colorful stream of light. My name has cool and kind kanji associated with it',
      'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.shareicon.net%2Fdata%2F256x256%2F2016%2F05%2F24%2F769980_man_512x512.png&f=1&nofb=1',
      await genHash('123'),
      false,
    ],
    [
      'Julia',
      '1234@test.xyz',
      'I was born in Fiji, and I learned how to program and meditate in the Tech Monestary.',
      'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fcdn1.iconfinder.com%2Fdata%2Ficons%2Fdiversity-avatars-volume-01-circles%2F64%2Fhipster-girl-glasses-african-512.png&f=1&nofb=1',
      await genHash('1234'),
      false,
    ],    
    [
      'Ryosuke',
      '123456@animeryosuke.com',
      'I love minecraft.',
      'https://external-content.duckduckgo.com/iu/?u=http%3A%2F%2Fmedia-minecraftforum.cursecdn.com%2Fattachments%2F168%2F973%2F635858917373096888.jpg&f=1&nofb=1',
      await genHash('123456'),
      true,
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