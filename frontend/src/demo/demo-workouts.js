export const workouts = [
  {
    _id: { $oid: '66cdf8a6f02b5a1a0af02407' },
    exercises: [
      {
        weight: { $numberInt: '60' },
        sets: [
          { reps: { $numberInt: '8' }, setId: { $numberInt: '1' } },
          { reps: { $numberInt: '8' }, setId: { $numberInt: '2' } },
          { reps: { $numberInt: '7' }, setId: { $numberInt: '3' } }
        ],
        completed: true,
        exerciseName: 'Bench Press',
        rest: '2:00'
      },
      {
        weight: { $numberDouble: '57.5' },
        sets: [
          { reps: { $numberInt: '8' }, setId: { $numberInt: '1' } },
          { reps: { $numberInt: '8' }, setId: { $numberInt: '2' } },
          { reps: { $numberInt: '8' }, setId: { $numberInt: '3' } }
        ],
        completed: true,
        exerciseName: 'Standing Lat Pulldown',
        rest: '2:00'
      },
      {
        weight: { $numberInt: '1' },
        sets: [{ reps: { $numberInt: '7' }, setId: { $numberInt: '1' } }],
        completed: true,
        exerciseName: 'Pull up',
        rest: '2:00'
      },
      {
        weight: { $numberInt: '1' },
        sets: [
          { reps: { $numberInt: '10' }, setId: { $numberInt: '1' } },
          { reps: { $numberInt: '9' }, setId: { $numberInt: '2' } },
          { reps: { $numberInt: '7' }, setId: { $numberInt: '3' } }
        ],
        completed: true,
        exerciseName: 'Dips',
        rest: '2:00'
      },
      {
        weight: { $numberDouble: '32.5' },
        sets: [
          { reps: { $numberInt: '8' }, setId: { $numberInt: '1' } },
          { reps: { $numberInt: '8' }, setId: { $numberInt: '2' } },
          { reps: { $numberInt: '8' }, setId: { $numberInt: '3' } }
        ],
        completed: true,
        exerciseName: 'Meadows',
        rest: '2:00'
      },
      {
        weight: { $numberInt: '1' },
        sets: [
          { reps: { $numberInt: '10' }, setId: { $numberInt: '1' } },
          { reps: { $numberInt: '10' }, setId: { $numberInt: '2' } },
          { reps: { $numberInt: '10' }, setId: { $numberInt: '3' } }
        ],
        completed: true,
        exerciseName: 'Trx Bicep Curls',
        rest: '2:00'
      },
      {
        weight: { $numberInt: '41' },
        sets: [
          { reps: { $numberInt: '8' }, setId: { $numberInt: '1' } },
          { reps: { $numberInt: '8' }, setId: { $numberInt: '2' } },
          { reps: { $numberInt: '7' }, setId: { $numberInt: '3' } }
        ],
        completed: true,
        exerciseName: 'Cable Extension',
        rest: '2:00'
      }
    ],
    createdBy: { $oid: '64f116d4e2c29ce3479b82dd' },
    programName: 'Ultimate Upper',
    createdOn: '8/27/2024, 12:02:46 PM'
  },
  {
    _id: { $oid: '66cf539aa2fee67d34911332' },
    exercises: [
      {
        weight: { $numberInt: '45' },
        sets: [
          { reps: { $numberInt: '9' }, setId: { $numberInt: '1' } },
          { reps: { $numberInt: '9' }, setId: { $numberInt: '2' } },
          { reps: { $numberInt: '8' }, setId: { $numberInt: '3' } }
        ],
        completed: true,
        exerciseName: 'Squat',
        rest: '2:00'
      },
      {
        weight: { $numberInt: '25' },
        sets: [
          { reps: { $numberInt: '10' }, setId: { $numberInt: '1' } },
          { reps: { $numberInt: '10' }, setId: { $numberInt: '2' } },
          { reps: { $numberInt: '9' }, setId: { $numberInt: '3' } }
        ],
        completed: true,
        exerciseName: 'Step Up',
        rest: '2:00'
      },
      {
        weight: { $numberInt: '30' },
        sets: [
          { reps: { $numberInt: '7' }, setId: { $numberInt: '1' } },
          { reps: { $numberInt: '7' }, setId: { $numberInt: '2' } },
          { reps: { $numberInt: '7' }, setId: { $numberInt: '3' } }
        ],
        completed: false,
        exerciseName: 'Squat Smith Machine',
        rest: '2:00'
      },
      {
        weight: { $numberInt: '105' },
        sets: [
          { reps: { $numberInt: '8' }, setId: { $numberInt: '1' } },
          { reps: { $numberInt: '8' }, setId: { $numberInt: '2' } },
          { reps: { $numberInt: '7' }, setId: { $numberInt: '3' } }
        ],
        completed: true,
        exerciseName: 'Seated Leg Curl',
        rest: '2:00'
      },
      {
        weight: { $numberDouble: '17.5' },
        sets: [
          { reps: { $numberInt: '7' }, setId: { $numberInt: '1' } },
          { reps: { $numberInt: '7' }, setId: { $numberInt: '2' } },
          { reps: { $numberInt: '6' }, setId: { $numberInt: '3' } }
        ],
        completed: true,
        exerciseName: 'Shoulder Extension Incline',
        rest: '2:00'
      },
      {
        weight: { $numberDouble: '37.5' },
        sets: [
          { reps: { $numberInt: '8' }, setId: { $numberInt: '1' } },
          { reps: { $numberInt: '8' }, setId: { $numberInt: '2' } },
          { reps: { $numberInt: '7' }, setId: { $numberInt: '3' } }
        ],
        completed: true,
        exerciseName: 'Shoulder Press',
        rest: '2:00'
      },
      {
        weight: { $numberInt: '60' },
        sets: [
          { reps: { $numberInt: '8' }, setId: { $numberInt: '1' } },
          { reps: { $numberInt: '8' }, setId: { $numberInt: '2' } },
          { reps: { $numberInt: '7' }, setId: { $numberInt: '3' } }
        ],
        completed: true,
        exerciseName: 'Cable Pull',
        rest: '2:00'
      }
    ],
    createdBy: { $oid: '64f116d4e2c29ce3479b82dd' },
    programName: 'Ultimate Lower',
    createdOn: '8/28/2024, 12:43:06 PM'
  },
  {
    _id: { $oid: '66f4454e30e71e7e73d46a61' },
    exercises: [
      {
        weight: { $numberInt: '65' },
        sets: [
          { reps: { $numberInt: '8' }, setId: { $numberInt: '1' } },
          { reps: { $numberInt: '8' }, setId: { $numberInt: '2' } },
          { reps: { $numberInt: '7' }, setId: { $numberInt: '3' } }
        ],
        completed: true,
        exerciseName: 'Machine Bench Press',
        rest: '2:00'
      },
      {
        weight: { $numberInt: '65' },
        sets: [
          { reps: { $numberInt: '10' }, setId: { $numberInt: '1' } },
          { reps: { $numberInt: '8' }, setId: { $numberInt: '2' } },
          { reps: { $numberInt: '7' }, setId: { $numberInt: '3' } }
        ],
        completed: true,
        exerciseName: 'Standing Lat Pushdown',
        rest: '2:00'
      },
      {
        weight: { $numberInt: '1' },
        sets: [{ reps: { $numberInt: '6' }, setId: { $numberInt: '1' } }],
        completed: true,
        exerciseName: 'Pull up',
        rest: '2:00'
      },
      {
        weight: { $numberInt: '1' },
        sets: [
          { reps: { $numberInt: '12' }, setId: { $numberInt: '1' } },
          { reps: { $numberInt: '11' }, setId: { $numberInt: '2' } },
          { reps: { $numberInt: '10' }, setId: { $numberInt: '3' } }
        ],
        completed: true,
        exerciseName: 'Dips',
        rest: '2:00'
      },
      {
        weight: { $numberInt: '40' },
        sets: [
          { reps: { $numberInt: '10' }, setId: { $numberInt: '1' } },
          { reps: { $numberInt: '9' }, setId: { $numberInt: '2' } },
          { reps: { $numberInt: '8' }, setId: { $numberInt: '3' } }
        ],
        completed: true,
        exerciseName: 'Meadows',
        rest: '2:00'
      },
      {
        weight: { $numberDouble: '45.5' },
        sets: [
          { reps: { $numberInt: '9' }, setId: { $numberInt: '1' } },
          { reps: { $numberInt: '9' }, setId: { $numberInt: '2' } },
          { reps: { $numberInt: '8' }, setId: { $numberInt: '3' } }
        ],
        completed: true,
        exerciseName: 'Cable Extension',
        rest: '2:00'
      },
      {
        weight: { $numberInt: '1' },
        sets: [
          { reps: { $numberInt: '9' }, setId: { $numberInt: '1' } },
          { reps: { $numberInt: '9' }, setId: { $numberInt: '2' } },
          { reps: { $numberInt: '7' }, setId: { $numberInt: '3' } }
        ],
        completed: true,
        exerciseName: 'Trx Bicep Curls',
        rest: '2:00'
      }
    ],
    createdBy: { $oid: '64f116d4e2c29ce3479b82dd' },
    programName: 'Ultimate Upper',
    createdOn: { $date: { $numberLong: '1727284558016' } }
  }
]
