interface UserProfile {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  gender: string;
  phone: string;
  role: string;
  createdAt: string;
}
interface UserState {
  loading: boolean;
  error: string | null;
  profile: UserProfile | null;
}
