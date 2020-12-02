module.exports = {
    rowsPerPageOptions: [20, 50, 100],
    constants: {
        types: {
            actuator: "actuator",
            sensor: "sensor"
        },
        sections: {
            ambient: "ambient",   // mediciones del ambiente
            fishtank: "fishtank",   // mediciones del grower fish tank
            upperbed: "upperbed",   // mediciones del expanded clay media grow bed
            mediumbed: "mediumbed",  // mediciones del primer deep water grow bed
            lowerbed: "lowerbed"    // mediciones del segundo deep water grow bed
        },
        actuator: {
            on: "on",
            off: "off"
        },
        colors: {
            ok: "success.light",
            error: "error.main"
        }
    },
    strings: {
        // main
        mainTitle: "Hydroponics Control System",

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
        changeView: "Change View",
        goToSection: "",

        // tabla resumen
        resumenLabel: "Name",
        resumenValue: "Value",
        resumenMin: "Minimum",
        resumenMax: "Maximum",
        resumenAlarm: "Alarm",
        saveChanges: "Save changes",

        // tabla controles
        controlesLabel: "Name",
        controlesState: "State",
    }
}