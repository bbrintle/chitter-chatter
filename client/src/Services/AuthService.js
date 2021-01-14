export default {
    login: user => {
        return fetch("/auth/login", {
            method: "post",
            body: JSON.stringify(user),
            headers: {
                "Content-Type": "application/json"
            }
        }).then(response => {
            //Passport sends 401 error back if not authenticated
            if(response.status !== 401) {
                return response.json().then(data => data);
            } else {
                return { 
                    isAuthenticated: false,
                    user: {email: "", username: ""},
                    message: {
                        msgBody: "Incorrect username or password.",
                        msgError: true
                    }
                };
            }
        });
    },
    register: user => {
        return fetch("/auth/register", {
            method: "post",
            body: JSON.stringify(user),
            headers: {
                "Content-Type": "application/json"
            }
        }).then(response => response.json())
          .then(data => data);
    },
    logout: () => {
        return fetch("/auth/logout")
            .then(response => response.json())
            .then(data => data);
    },
    //Sync back-end and front-end together
    isAuthenticated: () => {
        return fetch("/auth/authenticated")
            .then(response => {
                //Passport sends 401 error back if not authenticated
                if(response.status !== 401) {
                    return response.json().then(data => data);
                } else {
                    return { 
                        isAuthenticated: false,
                        user: {email: "", username: ""}
                    };
                }
            });
    }
}