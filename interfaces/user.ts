export interface IUser {
    _id:        string,
    birth?:     string,
    country?:   string,
    document?:  string,
    email:      string,
    name:       string,
    lastname:   string,
    password?:  string,
    role:       string,

    createdAt?: string,
    updatedAt?: string,
}


export interface ILogin {
    token: string
    user: IUserLogin
  }
  
export interface IUserLogin {
    name: string,
    lastname: string,
    email: string,
    role: string,
}