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
    name: string;
}

interface IEditedUser extends IUser {
    password: string;
}


interface ILoginUser {
    email: string;
    password: string;
}

interface listWishesResult {
    user : IUser;
    wishes : IWish[];
}
