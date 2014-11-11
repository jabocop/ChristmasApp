/// <reference path='alertFactory.ts' />
interface ILoginResult {
    token: string;
    user: IUser;
}

class loginFactory {
    private $http : ng.IHttpService;
    private $window : ng.IWindowService;
    private $location : ng.ILocationService;
    private alertFactory : alertFactory;
    public isAuthenticated : boolean;
    public user: IUser;
    public email: string;
    


    
    constructor( $http: ng.IHttpService, $window: ng.IWindowService,$location:ng.ILocationService, alertFactory: alertFactory) {
        this.$http = $http;
        this.$window = $window;
        this.$location = $location;
        this.alertFactory = alertFactory;
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
                this.alertFactory.addAlert(alertType.Success,"User logged in successfully");
                this.email = user.email;
                this.user = data.user;
            })
            .error((data, status, headers, config) =>  {
                // Erase the token if the user fails to log in
                delete this.$window.sessionStorage.removeItem("token");

                // Handle login errors here
                this.alertFactory.addAlert(alertType.Danger,"Invalid username or password");
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
                this.alertFactory.addAlert(alertType.Success,"User is created");
                this.$location.path('/login')
            }) 
            .error((data,status,headers,config)=> {
                this.alertFactory.addAlert(alertType.Danger,"Failed to register new userq");
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