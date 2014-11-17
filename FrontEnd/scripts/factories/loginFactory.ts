/// <reference path='alertFactory.ts' />
/// <reference path='../typings/angularjs/angular.d.ts' />
/// <reference path='../interfaces/objectDefinitions.d.ts' />

interface ILoginResult {
    token: string;
    user: IUser;
    groups : IGroup[];
}

interface ISessionData {
    user : IUser;
    groups : IGroup[];
}


class loginFactory {
    private $http : ng.IHttpService;
    private $window : ng.IWindowService;
    private $location : ng.ILocationService;
    private alertFactory : alertFactory;
    public isAuthenticated : boolean;
    public user: IUser;
    public groups : IGroup[];
    
    
    constructor( $http: ng.IHttpService, $window: ng.IWindowService,$location:ng.ILocationService, alertFactory: alertFactory) {
        this.$http = $http;
        this.$window = $window;
        this.$location = $location;
        this.alertFactory = alertFactory;
        var sessionData = this.$window.sessionStorage.getItem("sessionData");
        if (sessionData !== null) {
            //The browser is refreshed and the user needs to be refreshed from the sessionStorage
            this.initSessionData(JSON.parse(sessionData));
            
        }
    }


    private initSessionData(sessionData:ISessionData) {
        this.isAuthenticated = true;
        this.user = sessionData.user;
        this.groups = sessionData.groups;
    }
    
    private clearSessionStorage() {
        delete this.$window.sessionStorage.removeItem("token");
        delete this.$window.sessionStorage.removeItem("sessionData");
    }
    
 
    
    public Login(user : ILoginUser) : void {
        this.$http
            .post<ILoginResult>('/authenticate', user)
            .success((data, status, headers, config) =>  {
                
                var encodedProfile = data.token.split('.')[1];
                var urlEnoder = new urlDecoder();
                var profile :IUser =JSON.parse(urlEnoder.url_base64_decode(encodedProfile));
                this.$window.sessionStorage.setItem("token",data.token);
                var sessionData :ISessionData = {user : profile, groups : data.groups };
                this.$window.sessionStorage.setItem("sessionData",JSON.stringify(sessionData));
                this.initSessionData(sessionData);
                this.$location.path('/')
                
            })
            .error((data, status, headers, config) =>  {
                // Erase the token if the user fails to log in
                this.clearSessionStorage();

                // Handle login errors here
                this.alertFactory.addAlert(alertType.Danger,"Invalid username or password");
            }); 
    }

    public logout(): void {
        this.clearSessionStorage();
        this.isAuthenticated = false;
        this.user = null;
        this.groups = null;
    }

    public editUser(user:IEditedUser) : void {
        this.$http
            .post<IUser>('/editUser',user)
            .success((data, status, headers,config) => {
                this.alertFactory.addAlert(alertType.Success,"User is saved");
                this.$location.path('/login')
            }) 
            .error((data,status,headers,config)=> {
                this.alertFactory.addAlert(alertType.Danger,"Failed to save user");
            });
    }
    
    public refreshGroups() {
        this.$http.get<IGroup[]>('/listGroupsByUser', { params: { userId: this.user._id } })
            .success((data, status) => {
                this.groups = data;
                var sessionData :ISessionData = JSON.parse(this.$window.sessionStorage.getItem("sessionData"));
                if (sessionData !== null) {
                    sessionData.groups = this.groups;
                    this.$window.sessionStorage.setItem("sessionData",JSON.stringify(sessionData));
                }
                
            })
            .error((data, status) => {
                this.alertFactory.addAlert(alertType.Danger,"Failed to list groups");
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