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
    user: IUserLogged
  }
  
export interface IUserLogged {
    id: string,
    name: string,
    lastname: string,
    email: string,
    role: string,
}