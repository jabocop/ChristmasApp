interface IAlert {
    type : string;
    msg : string; 
}

enum alertType {
    Success,
    Info,
    Warning, 
    Danger
}


class alertFactory {
    
    public alerts : IAlert[];

    constructor () {
        this.alerts = [];
    }
    
    
    public addAlert(type : alertType, message : string) {
        var danger = 'danger';
        var success = 'success';
        var info = 'info';
        var warning = 'warning';
    
        var typeStr :string = null;
        switch (type) { 
            case alertType.Success: 
                typeStr = success;
                break;
            case alertType.Info: 
                typeStr = info;
                break;
            case alertType.Warning: 
                typeStr = warning;
                break;
            case alertType.Danger: 
                typeStr = danger;
                break;
        }
        if (typeStr !== null) {
            this.alerts.push({type:typeStr,msg:message});
        }
    }
    
    public closeAlert(index: number) {
        this.alerts.splice(index,1);
    }
    
}