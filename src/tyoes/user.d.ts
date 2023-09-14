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
  id: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  password?: string;
  userName?: string;
  summary?: string;
  profileImage?: string;
}
