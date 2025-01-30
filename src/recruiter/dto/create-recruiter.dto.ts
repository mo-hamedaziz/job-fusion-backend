export class CreateRecruiterDto {
  email: string;
  username: string;
  password: string;
  date_of_birth: Date;
  phoneNumber: number;
  verified?: boolean;
  gender: 'Male' | 'Female';
  photo?: string;
}
