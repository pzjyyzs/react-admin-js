const Components = [];
const files =  require.context('../../views/', true, /\.js$/);
files.keys().map(key => {
    if (key.includes('./index/') || key.includes('./login/')) {return false}
    const spliteName = key.split('.')
    const jsonObj = {};
    const path = `/index${spliteName[1].toLowerCase()}`;
    const component = files(key).default;
    jsonObj.path = path
    jsonObj.component = component
    Components.push(jsonObj)
    return key
})

export default Components;