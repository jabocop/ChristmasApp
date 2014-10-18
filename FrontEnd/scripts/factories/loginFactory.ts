class loginFactory {
    private $http : ng.IHttpService;
    private $window : ng.IWindowService;
    private $location : any;
    public isAuthenticated : boolean;
    public  email : string;

    
    constructor( $http: ng.IHttpService, $window: ng.IWindowService,$location:any) {
        this.$http = $http;
        this.$window = $window;
        this.$location = $location;
    }


    public Login(user : IUser) : void {
        this.$http
            .post<IAuthorizeRetVal>('/authenticate', user)
            .success((data, status, headers, config) =>  {
                this.$window.sessionStorage.setItem("token",data.token);
                this.isAuthenticated = true;
                var encodedProfile = data.token.split('.')[1];
                var urlEnoder = new urlDecoder();
                var profile = JSON.parse(urlEnoder.url_base64_decode(encodedProfile));
                //this.$scope.welcome = 'Welcome ' + profile.first_name + ' ' + profile.last_name;
                alert("Success" + user.email);
                this.email = user.email;
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

    public NewUser(user:IUser) : void {
        this.$http
            .post<any>('/newUser',user)
            .success((data, status, headers,config) => {
                alert("New user registered succesfully");
                this.$location.path('/login')
            }) 
            .error((data,status,headers,config)=> {
                alert("Failed to register user")
            });
    }


}