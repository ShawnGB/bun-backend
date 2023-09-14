interface UserCreateBody {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  userName: string;
  summary?: string;
  profileImage?: string;
}

interface UserUpdateBody {
  firstName?: string;
  lastName?: string;
  email?: string;
  password?: string;
  userName?: string;
  summary?: string;
  profileImage?: string;
}
