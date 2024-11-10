
  export interface IRequestResetPassword {
    Email: string;
  }
  
  export interface IResetPassword {
    Email: string;
    Code: string;
    newPassword: string;
  }