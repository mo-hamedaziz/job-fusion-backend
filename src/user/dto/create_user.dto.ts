export class CreateUserDto {
  email: string;
  username: string;
  password: string;
  date_of_birth: Date;
  phoneNumber: string;
  verified?: boolean;
  gender: 'Male' | 'Female';
  photo?: string;
  cv?: string;
  summary?: string;
  region?: string;
  country?: string;
  languages?: string[];
  studies?: string[];
  work_experiences?: string[];
}
