interface IWish{
    _id: string;
    name: string;
    comment: string;
    url: string;
    userId: string;
}

interface IGroup{
    _id: string;
    name : string;
    users : IUser[];
}


interface IUser {
    _id: string;
    email: string;
    firstName: string;
    lastName: string;
}

interface INewUser extends IUser {
    password: string;
}


interface ILoginUser {
    email: string;
    password: string;
}
