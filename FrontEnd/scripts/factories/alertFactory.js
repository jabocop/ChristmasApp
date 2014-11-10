var alertType;
(function (alertType) {
    alertType[alertType["Success"] = 0] = "Success";
    alertType[alertType["Info"] = 1] = "Info";
    alertType[alertType["Warning"] = 2] = "Warning";
    alertType[alertType["Danger"] = 3] = "Danger";
})(alertType || (alertType = {}));

var alertFactory = (function () {
    function alertFactory() {
        this.alerts = [];
    }
    alertFactory.prototype.addAlert = function (type, message) {
        var danger = 'danger';
        var success = 'success';
        var info = 'info';
        var warning = 'warning';

        var typeStr = null;
        switch (type) {
            case 0 /* Success */:
                typeStr = success;
                break;
            case 1 /* Info */:
                typeStr = info;
                break;
            case 2 /* Warning */:
                typeStr = warning;
                break;
            case 3 /* Danger */:
                typeStr = danger;
                break;
        }
        if (typeStr !== null) {
            this.alerts.push({ type: typeStr, msg: message });
        }
    };

    alertFactory.prototype.closeAlert = function (index) {
        this.alerts.splice(index, 1);
    };
    return alertFactory;
})();
