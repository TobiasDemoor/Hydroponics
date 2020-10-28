module.exports = {
    rowsPerPageOptions: [20, 50, 100],
    constants: {
        types: {
            actuator: "actuator",
            sensor: "sensor"
        },
        actuator: {
            on: "on",
            off: "off"
        }
    },
    strings: {
        // general
        confirmar: "CONFIRM",

        // login
        tituloLogin: "Log in",
        usuario: "Username",
        password: "Password",
        confirmarLogin: null,

        // change login
        tituloChangeLogin: "Change login credentials",
        currentUsername: "Current username",
        currentPassword: "Current password",
        newUsername: "New username",
        newPassword: "New password",
        newPasswordVerify: "Repeat new password",
        passNoMatchError: "Passwords don't match",
        confirmarChangeLogin: null,

        // navigation
        changeLoginLink: "Change login",
        logOutLink: "Log out",

        // tablas resumen
        controlesLabel: "Name",
        controlesState: "State",
    }
}