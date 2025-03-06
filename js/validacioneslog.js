        function validateUser() {
            let user = document.getElementById("newUser").value.trim();
            let userMessage = document.getElementById("userMessage");

            if (!/^[A-Za-z]{3,15}$/.test(user)) {
                userMessage.textContent = "Debe contener entre 3 y 15 caracteres";
            } else {
                userMessage.textContent = "";
            }
        }

        function validateEmail() {
            let email = document.getElementById("newEmail").value.trim();
            let emailMessage = document.getElementById("emailMessage");

            let emailRegex = /^[A-Za-z0-9]+(?:[._%+-][A-Za-z0-9]+)*@[A-Za-z0-9-]+\.[A-Za-z]{2,}$/;

            if (!emailRegex.test(email)) {
                emailMessage.textContent = "Escribe un correo válido: usuario@dominio.dominio";
            } else {
                emailMessage.textContent = "";
            }
        }

        function validatePassword() {
            let pass = document.getElementById("newPassword").value.trim();
            let passMessage = document.getElementById("passMessage");

            if (pass.length < 5 || pass.length > 8) {
                passMessage.textContent = "Debe tener entre 5 y 8 caracteres";
            } else {
                passMessage.textContent = "";
            }
        }

        function register() {
            let user = document.getElementById("newUser").value.trim();
            let email = document.getElementById("newEmail").value.trim();
            let pass = document.getElementById("newPassword").value.trim();
            let message = document.getElementById("message");

            if (user && pass && email) {
                localStorage.setItem("user", user);
                localStorage.setItem("email", email);
                localStorage.setItem("pass", pass);
                message.textContent = "Registrado con éxito";
                message.style.color = "green";

                setTimeout(() => {
                    localStorage.setItem("authUser", user);
                    window.location.href = "index.html";
                }, 1000);
            } else {
                message.textContent = "Por favor, llena todos los campos";
                message.style.color = "red";
            }
        }

        function login() {
            let user = document.getElementById("username").value.trim();
            let pass = document.getElementById("password").value.trim();
            let email = document.getElementById("email").value.trim();
            let errorMessage = document.getElementById("error-message");

            let savedUser = localStorage.getItem("user");
            let savedPass = localStorage.getItem("pass");
            let savedEmail = localStorage.getItem("email");

            if (user === "" || pass === "" || email === "") {
                errorMessage.textContent = "Ingresar credenciales";
            } else if (user === savedUser && pass === savedPass && email === savedEmail) {
                localStorage.setItem("authUser", user);
                window.location.href = "index.html";
            } else {
                errorMessage.textContent = "Credenciales incorrectas";
            }
        }

        
        
        
        

