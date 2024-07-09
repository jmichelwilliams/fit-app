# Fit App API Documentation

## Endpoints

### MVP1

| Endpoint                 | Method   | Description                     |
| ------------------------ | -------- | ------------------------------- |
| `/programs/user/:userId` | `GET`    | Get all programs for user       |
| `/programs/:programId`   | `GET`    | Get a specific program          |
| `/programs/:programId`   | `PUT`    | Modify a program                |
| `/programs/:userId`      | `POST`   | Add a program                   |
| `/programs/:programId`   | `DELETE` | Delete a program                |
| `/workouts/:userId`      | `GET`    | Get all workouts for a user     |
| `/workouts/:userId`      | `POST`   | Add a workout to user's profile |
| `/workouts/:userId`      | `GET`    | Get all workouts for a user     |
| `/workouts/:workoutId`   | `DELETE` | Delete a workout for a user     |
