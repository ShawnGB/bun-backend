interface UserCreateBody {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  username: string; // Change to 'username' to match the new model
  summary?: string;
  profileImage?: string;
}
interface UserUpdateBody {
  id: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  password?: string;
  username?: string;
  summary?: string;
  profileImage?: string;
}
