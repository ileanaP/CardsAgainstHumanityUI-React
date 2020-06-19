import Noty from 'noty';  
import "../../node_modules/noty/lib/noty.css";  
import "../../node_modules/noty/lib/themes/mint.css";
import Axios from 'axios';

export function removeDuplicates(arr) {
    arr = arr.filter((thing, index, self) =>
                index === self.findIndex((t) => (
                    t.place === thing.place && t.name === thing.name
                ))
            )

    return arr;
}


export async function notif(params)
{
    
    if(typeof params == "string")
        params = {msg: params}

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
        text: params.msg,
        type: params.type,
        timeout: params.timeout,
        progressBar: params.timeout > 0 ? true : false,
        layout: "topCenter",
        buttons: params.buttons
    }).show();
}

export async function leaveGame() 
{
    let user = JSON.parse(localStorage.getItem('userData'));

    if(user == null || user['game'] == null)
        return;

    const callLink = 'games/' + user['game'] + '/users/' + user['id'] + '/remove';

    await Axios.post(global.api + callLink)
    .then(data => {
        user['game'] = null;
        localStorage.setItem('userData', JSON.stringify(user));

        this.setState({redirect: '/'});
    })
    .catch(error => {
        console.log(error);
    }); 
}