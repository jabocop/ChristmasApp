interface ILoginResult {
    token: string;
    user: IUser;
}

class loginFactory {
    private $http : ng.IHttpService;
    private $window : ng.IWindowService;
    private $location : ng.ILocationService;
    public isAuthenticated : boolean;
    public user: IUser;
    public email: string;
    


    
    constructor( $http: ng.IHttpService, $window: ng.IWindowService,$location:ng.ILocationService) {
        this.$http = $http;
        this.$window = $window;
        this.$location = $location;
    }


    public Login(user : ILoginUser) : void {
        this.$http
            .post<ILoginResult>('/authenticate', user)
            .success((data, status, headers, config) =>  {
                this.$window.sessionStorage.setItem("token",data.token);
                this.isAuthenticated = true;
                var encodedProfile = data.token.split('.')[1];
                var urlEnoder = new urlDecoder();
                var profile = JSON.parse(urlEnoder.url_base64_decode(encodedProfile));
                //this.$scope.welcome = 'Welcome ' + profile.first_name + ' ' + profile.last_name;
                alert("Success" + user.email);
                this.email = user.email;
                this.user = data.user;
            })
            .error((data, status, headers, config) =>  {
                // Erase the token if the user fails to log in
                delete this.$window.sessionStorage.removeItem("token");

                // Handle login errors here
                alert("Fail!");
                //this.$scope.message = 'Error: Invalid user or password';
            }); 
    }

    public Logout(): void {
        delete this.$window.sessionStorage.removeItem("token");
        this.isAuthenticated = false;
        this.email = null;
    }

    public NewUser(user:INewUser) : void {
        this.$http
            .post<IUser>('/newUser',user)
            .success((data, status, headers,config) => {
                alert("New user registered succesfully");
                this.$location.path('/login')
            }) 
            .error((data,status,headers,config)=> {
                alert("Failed to register user")
            });
    }

}



class urlDecoder {
    public url_base64_decode(str: string) {
        var output = str.replace('-', '+').replace('_', '/');
        switch (output.length % 4) {
            case 0:
                break;
            case 2:
                output += '==';
                break;
            case 3:
                output += '=';
                break;
            default:
                throw 'Illegal base64url string!';
        }
        return window.atob(output); //polifyll https://github.com/davidchambers/Base64.js
    }
}