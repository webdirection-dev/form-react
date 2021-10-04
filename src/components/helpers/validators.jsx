const onValidateName = (name) => {
    if (name.length < 5) alert('The name must be at least 5 lettres');
};

const onValidateEmail = (email) => {
    if (!/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email))
        alert("You have entered an invalid email address!")
};

export {
    onValidateName,
    onValidateEmail
}