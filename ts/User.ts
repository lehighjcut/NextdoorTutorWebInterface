class User {

    private _email: string = "";
    private _userName: string = "";
    private _user_id: string = "";
    private _sessionToken: string = "";
    private _profilePhotoUrl: string = "";
    private static _loggedUser: any = null;

    static getUser() {
        if (User._loggedUser == null) {
            User._loggedUser = new User();
        }
        return User._loggedUser;
    }

    static get email() {
        return User._loggedUser._email;
    }

    static get userName(): string {
        return User._loggedUser._userName;
    }

    static get user_id(): string {
        return User._loggedUser._user_id;
    }

    static get sessionToken(): string {
        return User._loggedUser._sessionToken;
    }

    static get profilePhotoUrl(): string {
        return User._loggedUser._profilePhotoUrl;
    }

    set email(value: string) {
        User._loggedUser._email = value;
    }

    set userName(value: string) {
        User._loggedUser._userName = value;
    }

    set user_id(value: string) {
        User._loggedUser._user_id = value;
    }

    set sessionToken(value: string) {
        User._loggedUser._sessionToken = value;
    }

    set profilePhotoUrl(value: string) {
        User._loggedUser._profilePhotoUrl = value;
    }

    static destroyUser() {
        User._loggedUser = null;
    }
}