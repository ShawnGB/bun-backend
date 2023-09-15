interface UserCreateBody {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  username: string; // Change to 'username' to match the new model
  bio?: string;
  profilePicture?: string;
}

interface UserUpdateBody {
  id: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  password?: string;
  username?: string;
  bio?: string;
  profilePicture?: string;
}
