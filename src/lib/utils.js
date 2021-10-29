import Noty from 'noty';  
import "../../node_modules/noty/lib/noty.css";  
import "../../node_modules/noty/lib/themes/sunset.css";
import Axios from 'axios';
import { createBrowserHistory } from "history";

const history = createBrowserHistory();

export function removeDuplicates(arr) {

    let uniqueArray = arr.filter((thing, index) => {
        const _thing = JSON.stringify(thing);
        return index === arr.findIndex(obj => {
          return JSON.stringify(obj) === _thing;
        });
      });

    return uniqueArray;
}

export function inArray(needle, haystack) {
    var length = haystack.length;
    for(var i = 0; i < length; i++) {
        if(haystack[i] == needle) return true;
    }
    return false;
}

export async function notif(params)
{
    
    if(typeof params == "string")
        params = {msg: params}


    //type: alert (dark mud green), success (light green), error (red), warning (yellow), info (blue), pink 
    params = {
        msg: (params.msg !== undefined ? params.msg : ""), 
        timeout: (params.timeout !== undefined ? params.timeout : 5000), 
        type: (params.type !== undefined ? params.type : 'error'), 
        buttons: (params.buttons !== undefined ? params.buttons : false), 
        yesAction: (params.yesAction !== undefined ? params.yesAction : () => {})
    };
    
    params.buttons = params.buttons ? [
                                      Noty.button('YES', 'btn btn-success', function () {
                                          params.yesAction();
                                          n.close();
                                      }, {id: 'button1', 'data-status': 'ok'}),
                                  
                                      Noty.button('NO', 'btn btn-error', function () {
                                          n.close();
                                      })
                                      ] : "";

    let n = new Noty({
        theme: "sunset",
        text: params.msg,
        type: params.type,
        timeout: params.timeout,
        progressBar: params.timeout > 0 ? true : false,
        layout: "topCenter",
        buttons: params.buttons
    }).show();
}

export async function removePlayer(playerid, gameid)
{
    const callLink = 'games/' + gameid + '/users/' + playerid + '/remove';

    await Axios.post(global.api + callLink);
}

export async function leaveGame()
{
    let user = fromStorage('userData');

    if(user == null || user['game'] == null)
        return;

    removePlayer(user.id, user['game']).then(e => {
        user['game'] = null;
        toStorage('userData', JSON.stringify(user));

        history.push("/");
        history.go(0);
    })
    .catch(error => {
        if(error.response !== undefined)
        {
            if(error.response.status == 403)
                notif("You cannot leave the game without ending it");
            if(error.response.status == 404)
                notif("Data not found");
        }
        console.log(error);
    });
}

export function setupUserData(data)
{
    let localData = {
        id: data['id'],
        name: data['name'],
        email: data['email'],
        token: data['token'],
        game: (data['in_game'] !== undefined ? data['in_game'] : null)
    };
    
    console.log("~~~~");
    console.log(localData);
    console.log("~~~~");

    toStorage('userData', JSON.stringify(localData));
    toStorage('loggedIn', 'true');
}

export function fromStorage(stuff)
{
    return JSON.parse(localStorage.getItem(stuff));
}

export function toStorage(stuff, data)
{
    localStorage.setItem(stuff, data);
}

