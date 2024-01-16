# Fit App API Documentation

## Endpoints

### MVP1

| Endpoint                            | Method | Description                                 |
| ----------------------------------- | ------ | ------------------------------------------- |
| `/login`                            | `POST` | Login user                                  |
| `/user/:userId`                     | `GET`  | Get user by id                              |
| `/user/:userId/programs`            | `GET`  | Get all programs for user                   |
| `/user/:userId/programs/:programId` | `GET`  | Get specific program for specific user      |
| `/user/:userId/workouts`            | `GET`  | Get all workouts for a specific user        |
| `/user/:userId/workouts/:workoutId` | `GET`  | Get specific workout from a user            |
| `/user/:userId/workouts`            | `POST` | Add a new workout to the workouts of a user |
