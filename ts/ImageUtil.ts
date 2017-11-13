class ImageUtil {
    private static readonly GETPROFILEPICTUREROUTE = "/api/drive/download/profilePhoto";
    private static readonly POSTPROFILEPICTUREROUTE = "/api/drive/upload/profilePhoto";

    public static uploadProfilePictureToServer(
        file: File, successFunction: (data: any) => any, errorFunction: (data: any) => any
    ) {
        $.ajax({
            url: ImageUtil.POSTPROFILEPICTUREROUTE + "/" + User.userId(),
            method: 'POST',
            data: file,
            processData: false,  // tell jQuery not to process the data as a string
            contentType: file.type,
            headers: {"Authorization": User.sessionToken()},
            success: successFunction,
            error: errorFunction
        });
    }

    // Returns a unique url so the browser doesn't cache the previous image if someone just uploaded a new one
    public static getNewProfilePhotoUrlForCurrentUser(userId: string, sessionToken: string) {
        return ImageUtil.GETPROFILEPICTUREROUTE + "/" + User.userId() + ImageUtil.generateNewQueryString(userId, sessionToken);
    }

    // Returns a unique url so the browser doesn't cache the previous image if someone just uploaded a new one
    public static getNewProfilePhotoUrl(userId: string, sessionToken: string, askerId: string) {
        return ImageUtil.GETPROFILEPICTUREROUTE + "/" + userId + ImageUtil.generateNewQueryString(askerId, sessionToken);
    }

    public static hideImagesUntilLoaded(preloaderClassName: string, imagesClassName: string) {
        setTimeout(function() {
            $(preloaderClassName).hide();
            $(imagesClassName).show();
        }, 1700);
    }

    private static generateNewQueryString(userId: string, sessionToken: string) {
        return "?userId=" + userId + "&sessionToken=" + sessionToken + "&time=" + new Date().getTime();
    }


}
