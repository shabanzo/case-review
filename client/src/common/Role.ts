import { getCurrentUser } from '../services/auth.service';

export const IsAdmin = () => {
  return getCurrentUser().role === 'admin';
};
