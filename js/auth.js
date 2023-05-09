var formulario = document.getElementById("formulario");

let nombreUsuario = '';
let claveUsuario = '';


function validar(e) {
        var nombre = document.getElementById("nombre"),
            clave = document.getElementById("clave");
            
        
    if(nombre.value == 0 || clave.value == 0){
            e.preventDefault();
            alert("Error, los campos deben ser completados");
    } else {
            e.preventDefault();
           console.log('nombre, clave: del formulario', nombre.value, clave.value);
           nombreUsuario = nombre.value;
           claveUsuario = (clave.value).toString();
             
            let _body = {userid: nombreUsuario, clave: claveUsuario};
           console.log('body ', _body);

           fetch('https://serveringroup.herokuapp.com/usuarios/log', {
                method: "POST",
                body: JSON.stringify(_body),
                headers: {"Content-Type": "application/json"}
            })
            .then(response => response.json())
            .then ((data) => {
                if(data.ok === false){
                    alert('Clave o nombre incorrectos - consulte al administrador');
                    return;
            
                }else {
                    console.log('fetch exitoso');
                    //rolUsuario = data.usuario.rol;
                    window.open('../vistas/tabs.html');
                    }
                })
                .catch(function(error) {
                    console.log('Login Failed', error);
                });
        }

}

formulario.addEventListener("submit", validar);
