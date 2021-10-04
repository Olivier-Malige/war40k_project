export interface UserInput {
  displayName?: string;
  role?: 'admin' | 'contributor' | 'tester';
  email?: string;
  id?: string;
  disabled?: boolean;
  password?: string;
}

export interface User {
  displayName?: string;
  id: string;
  role: 'admin' | 'contributor' | 'tester';
  email: string;
  disabled: boolean;
}
