export const programs = [
  {
    _id: { $oid: '6690034cc976fb54e162a145' },
    programName: 'Ultimate Upper',
    exercises: [
      {
        exerciseName: 'Machine Bench Press',
        weight: { $numberInt: '60' },
        sets: [
          { reps: { $numberInt: '7' }, setId: { $numberInt: '1' } },
          { reps: { $numberInt: '7' }, setId: { $numberInt: '2' } },
          { reps: { $numberInt: '7' }, setId: { $numberInt: '3' } }
        ],
        rest: '2:00'
      },
      {
        exerciseName: 'Standing Lat Pushdown',
        weight: { $numberInt: '55' },
        sets: [
          { reps: { $numberInt: '7' }, setId: { $numberInt: '1' } },
          { reps: { $numberInt: '7' }, setId: { $numberInt: '2' } },
          { reps: { $numberInt: '7' }, setId: { $numberInt: '3' } }
        ],
        rest: '2:00'
      },
      {
        exerciseName: 'Pull up',
        weight: { $numberInt: '1' },
        sets: [{ reps: { $numberInt: '10' }, setId: { $numberInt: '1' } }],
        rest: '2:00'
      },
      {
        exerciseName: 'Dips',
        weight: { $numberInt: '1' },
        sets: [
          { reps: { $numberInt: '7' }, setId: { $numberInt: '1' } },
          { reps: { $numberInt: '7' }, setId: { $numberInt: '2' } },
          { reps: { $numberInt: '7' }, setId: { $numberInt: '3' } }
        ],
        rest: '2:00'
      },
      {
        exerciseName: 'Meadows',
        weight: { $numberDouble: '32.5' },
        sets: [
          { reps: { $numberInt: '10' }, setId: { $numberInt: '1' } },
          { reps: { $numberInt: '10' }, setId: { $numberInt: '2' } },
          { reps: { $numberInt: '10' }, setId: { $numberInt: '3' } }
        ],
        rest: '2:00'
      },
      {
        exerciseName: 'Trx Bicep Curls',
        weight: { $numberInt: '1' },
        sets: [
          { reps: { $numberInt: '10' }, setId: { $numberInt: '1' } },
          { reps: { $numberInt: '10' }, setId: { $numberInt: '2' } },
          { reps: { $numberInt: '10' }, setId: { $numberInt: '3' } }
        ],
        rest: '2:00'
      },
      {
        exerciseName: 'Cable Extension',
        weight: { $numberInt: '45' },
        sets: [
          { reps: { $numberInt: '10' }, setId: { $numberInt: '1' } },
          { reps: { $numberInt: '10' }, setId: { $numberInt: '2' } },
          { reps: { $numberInt: '10' }, setId: { $numberInt: '3' } }
        ],
        rest: '2:00'
      }
    ],
    createdBy: { $oid: '64f116d4e2c29ce3479b82dd' }
  },
  {
    _id: { $oid: '668eabbce486d6e2f926f17f' },
    programName: 'Ultimate Lower',
    exercises: [
      {
        exerciseName: 'Squat',
        weight: { $numberInt: '45' },
        sets: [
          { reps: { $numberInt: '7' }, setId: { $numberInt: '1' } },
          { reps: { $numberInt: '7' }, setId: { $numberInt: '2' } },
          { reps: { $numberInt: '7' }, setId: { $numberInt: '3' } }
        ],
        rest: '2:00'
      },
      {
        exerciseName: 'Step Up',
        weight: { $numberInt: '20' },
        sets: [
          { reps: { $numberInt: '10' }, setId: { $numberInt: '1' } },
          { reps: { $numberInt: '10' }, setId: { $numberInt: '2' } },
          { reps: { $numberInt: '10' }, setId: { $numberInt: '3' } }
        ],
        rest: '2:00'
      },
      {
        exerciseName: 'Squat Smith Machine',
        weight: { $numberInt: '30' },
        sets: [
          { reps: { $numberInt: '7' }, setId: { $numberInt: '1' } },
          { reps: { $numberInt: '7' }, setId: { $numberInt: '2' } },
          { reps: { $numberInt: '7' }, setId: { $numberInt: '3' } }
        ],
        rest: '2:00'
      },
      {
        exerciseName: 'Seated Leg Curl',
        weight: { $numberInt: '100' },
        sets: [
          { reps: { $numberInt: '7' }, setId: { $numberInt: '1' } },
          { reps: { $numberInt: '7' }, setId: { $numberInt: '2' } },
          { reps: { $numberInt: '7' }, setId: { $numberInt: '3' } }
        ],
        rest: '2:00'
      },
      {
        exerciseName: 'Inclined Lat Raise',
        weight: { $numberInt: '15' },
        sets: [
          { reps: { $numberInt: '7' }, setId: { $numberInt: '1' } },
          { reps: { $numberInt: '7' }, setId: { $numberInt: '2' } },
          { reps: { $numberInt: '7' }, setId: { $numberInt: '3' } }
        ],
        rest: '2:00'
      },
      {
        exerciseName: 'Shoulder Press',
        weight: { $numberDouble: '37.5' },
        sets: [
          { reps: { $numberInt: '7' }, setId: { $numberInt: '1' } },
          { reps: { $numberInt: '7' }, setId: { $numberInt: '2' } },
          { reps: { $numberInt: '7' }, setId: { $numberInt: '3' } }
        ],
        rest: '2:00'
      },
      {
        exerciseName: 'Face pull',
        weight: { $numberInt: '55' },
        sets: [
          { reps: { $numberInt: '7' }, setId: { $numberInt: '1' } },
          { reps: { $numberInt: '7' }, setId: { $numberInt: '2' } },
          { reps: { $numberInt: '7' }, setId: { $numberInt: '3' } }
        ],
        rest: '2:00'
      }
    ],
    createdBy: { $oid: '64f116d4e2c29ce3479b82dd' }
  },
  {
    _id: { $oid: '6668bb56da7a566774abbcfb' },
    programName: 'Lower and Shoulders',
    exercises: [
      {
        exerciseName: 'Leg Press',
        weight: { $numberInt: '135' },
        sets: [
          { reps: { $numberInt: '8' }, setId: { $numberInt: '1' } },
          { reps: { $numberInt: '8' }, setId: { $numberInt: '2' } },
          { reps: { $numberInt: '8' }, setId: { $numberInt: '3' } }
        ],
        rest: '2:00'
      },
      {
        exerciseName: 'Leg Extension',
        weight: { $numberInt: '50' },
        sets: [
          { reps: { $numberInt: '8' }, setId: { $numberInt: '1' } },
          { reps: { $numberInt: '8' }, setId: { $numberInt: '2' } },
          { reps: { $numberInt: '8' }, setId: { $numberInt: '3' } }
        ],
        rest: '2:00'
      },
      {
        exerciseName: 'Seated Leg Curls',
        weight: { $numberInt: '90' },
        sets: [
          { reps: { $numberInt: '8' }, setId: { $numberInt: '1' } },
          { reps: { $numberInt: '8' }, setId: { $numberInt: '2' } },
          { reps: { $numberInt: '8' }, setId: { $numberInt: '3' } }
        ],
        rest: '2:00'
      },
      {
        exerciseName: 'Lateral Cable Raise',
        weight: { $numberInt: '10' },
        sets: [
          { reps: { $numberInt: '8' }, setId: { $numberInt: '1' } },
          { reps: { $numberInt: '8' }, setId: { $numberInt: '2' } },
          { reps: { $numberInt: '8' }, setId: { $numberInt: '3' } }
        ],
        rest: '2:00'
      },
      {
        exerciseName: 'Back Fly Pec Dec',
        weight: { $numberInt: '100' },
        sets: [
          { reps: { $numberInt: '8' }, setId: { $numberInt: '1' } },
          { reps: { $numberInt: '8' }, setId: { $numberInt: '2' } },
          { reps: { $numberInt: '8' }, setId: { $numberInt: '3' } }
        ],
        rest: '2:00'
      },
      {
        exerciseName: 'Cable Crunches',
        weight: { $numberInt: '72' },
        sets: [
          { reps: { $numberInt: '8' }, setId: { $numberInt: '1' } },
          { reps: { $numberInt: '8' }, setId: { $numberInt: '2' } },
          { reps: { $numberInt: '8' }, setId: { $numberInt: '3' } }
        ],
        rest: '2:00'
      }
    ],
    createdBy: { $oid: '64f116d4e2c29ce3479b82dd' }
  }
]
