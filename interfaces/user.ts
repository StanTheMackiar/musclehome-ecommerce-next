export interface IUser {
    _id:       string,
    birth?:     string,
    country?:   string,
    document?:  string,
    email:     string,
    name:      string,
    password:  string,
    role:      string,

    createdAt?: string,
    updatedAt?: string,
}