export function errHandler(err) {
    console.log(err);


    if (err.response) {
        err = err.response;
        console.log(err);

        if (err.data)
            alert(err.data);
    } else if (err.message) {
        alert(err.message)
    }
}
