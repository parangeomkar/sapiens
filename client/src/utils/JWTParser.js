export default (token) => {
    var base64Data = token.split('.')[1];
    var data = atob(base64Data);
    return JSON.parse(data);
}