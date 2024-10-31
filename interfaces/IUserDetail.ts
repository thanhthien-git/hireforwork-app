
export interface IUserDetail {
  careerFirstName?: string;
  lastName?: string;
  careerEmail?: string;
  careerPhone?: string;
  careerPicture?: string;
  languages: string[] | undefined;

  profile?: {
    userCV: string[] | undefined;
    skills: string[] | undefined;
  };
}
