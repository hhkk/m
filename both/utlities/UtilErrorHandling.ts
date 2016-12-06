/**
 * Created by Owner on 10/30/2016.
 */


export class UtilErrorHandling {

    public static logError(e, alertbool:boolean):string {
        let r = '';
        if (e.message) {
            r += e.message;
        }
        if (e.stack) {
            r += ' | stack: ' + e.stack;
        }
        if (alertbool)
            alert ('hbkerror:' + r);
        console.log('hbkerror:' + r);
        return r;
    }
}
