# Backend Protype Elysia, Prisma, Bun runtime

## Development

To start the development server run:

```bash
bun run dev
```

Open http://localhost:3000/ with your browser to see the result.

# Schema Overview

The database schema consists of the following models, each representing a specific entity in the Skillity platform:

### User

- **Description:** Represents platform users who can register, interact, and engage with Skillity's features.

#### Fields:

- `id` (String): A unique identifier for the user.
- `firstName` (String): The first name of the user.
- `lastName` (String): The last name of the user.
- `username` (String): The username chosen by the user (unique).
- `email` (String): The user's email address (unique).
- `password` (String): The hashed password for user authentication.
- `profilePicture` (String): An optional URL for the user's profile picture.
- `bio` (String): An optional user biography.
- `location` (String): An optional field for the user's location.
- `createdAt` (DateTime): Timestamp for user registration.
- `updatedAt` (DateTime): Timestamp for user profile updates.
- `isVerified` (Boolean): Indicates whether the user's account is verified (default is `false`).

#### Relations:

- `badges` (Badge[]): Badges earned by the user.
- `courses` (Course[]): Courses created by the user.
- `reviews` (Review[]): Reviews written by the user.
- `events` (Event[]): Events attended by the user.
- `bookings` (Booking[]): Bookings made by the user.
- `communityPosts` (CommunityPost[]): Community posts created by the user.
- `comments` (Comment[]): Comments made by the user.

### Course

- **Description:** Represents courses, workshops, or tutoring sessions available on Skillity.

#### Fields:

- `id` (String): A unique identifier for the course.
- `title` (String): The title of the course.
- `description` (String): A description of the course.
- `price` (Float): The price of the course.
- `schedule` (DateTime): The schedule or date of the course.
- `location` (String): The location where the course takes place.
- `createdAt` (DateTime): Timestamp for course creation.
- `updatedAt` (DateTime): Timestamp for course updates.

#### Relations:

- `instructor` (User): The user who is the instructor for the course.
- `reviews` (Review[]): Reviews for the course.
- `bookings` (Booking[]): Bookings made for the course.

### Review

- **Description:** Represents reviews given by users for courses.

#### Fields:

- `id` (String): A unique identifier for the review.
- `rating` (Float): The rating given in the review.
- `reviewText` (String): Optional text content of the review.
- `createdAt` (DateTime): Timestamp for review creation.
- `updatedAt` (DateTime): Timestamp for review updates.

#### Relations:

- `course` (Course): The course being reviewed.
- `user` (User): The user who wrote the review.

### Event

- **Description:** Represents events hosted on the Skillity platform.

#### Fields:

- `id` (String): A unique identifier for the event.
- `title` (String): The title of the event.
- `description` (String): Optional description of the event.
- `eventDate` (DateTime): The date of the event.
- `location` (String): Optional location of the event.
- `createdAt` (DateTime): Timestamp for event creation.
- `updatedAt` (DateTime): Timestamp for event updates.

#### Relations:

- `creator` (User): The user who created the event.
- `attendees` (User[]): Users attending the event.

### Booking

- **Description:** Represents user bookings for courses.

#### Fields:

- `id` (String): A unique identifier for the booking.
- `bookingDate` (DateTime): The date of the booking.
- `status` (String): The status of the booking.
- `totalPrice` (Float): The total price of the booking.
- `charityDonation` (Float): Optional charity donation amount.
- `createdAt` (DateTime): Timestamp for booking creation.
- `updatedAt` (DateTime): Timestamp for booking updates.

#### Relations:

- `course` (Course): The course booked.
- `user` (User): The user who made the booking.

### Badge

- **Description:** Represents badges earned by users for various achievements.

#### Fields:

- `id` (String): A unique identifier for the badge.
- `name` (String): The name of the badge.
- `description` (String): Optional description of the badge.
- `imageUrl` (String): Optional URL for the badge image.
- `createdAt` (DateTime): Timestamp for badge creation.
- `updatedAt` (DateTime): Timestamp for badge updates.

#### Relations:

- `users` (User[]): Users who have earned this badge.

### CommunityPost

- **Description:** Represents community posts created by users on Skillity.

#### Fields:

- `id` (String): A unique identifier for the community post.
- `content` (String): The content of the community post.
- `postDate` (DateTime): The date of the community post.
- `createdAt` (DateTime): Timestamp for post creation.
- `updatedAt` (DateTime): Timestamp for post updates.

#### Relations:

- `creator` (User): The user who created the post.
- `comments` (Comment[]): Comments on the post.

### Comment

- **Description:** Represents comments made by users on community posts.

#### Fields:

- `id` (String): A unique identifier for the comment.
- `content` (String): The content of the comment.
- `commentDate` (DateTime): The date of the comment.
- `createdAt` (DateTime): Timestamp for comment creation.
- `updatedAt` (DateTime): Timestamp for comment updates.

#### Relations:

- `communityPost` (CommunityPost): The post being commented on.
- `user` (User): The user who wrote the comment.
