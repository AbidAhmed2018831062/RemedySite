export default function changeUserName(username){
    global.username=username;
    return username;
}

export function returnUserName()
{
    return global.username;
}
let appName="Remedy";
export { appName };

