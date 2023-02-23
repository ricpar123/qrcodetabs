//insertar datos del qr scan


jsarray = JSON.parse(sessionStorage.getItem('datos'));//recuperar datos de memoria

//alert(jsarray);

//recuperar los campos

let datoscom = jsarray.split('\n');
let cliNombre = datoscom[0];
let desEquipo = datoscom[1];
let marcaEquipo = datoscom[2];
let modEquipo = datoscom[3];
let serieEquipo = datoscom[4];

//reemplazar en el formulario

document.querySelector('input[id="cliente"]').value = cliNombre;
document.querySelector('input[id="descripcion"]').value = desEquipo;
document.querySelector('input[id="marca"]').value = marcaEquipo;
document.querySelector('input[id="modelo"]').value = modEquipo;
document.querySelector('input[id="serie"]').value = serieEquipo;

//llenar datos de tecnicos


async function fetchUsuarios(){
   
    const res = await fetch('https://serveringroup.herokuapp.com/usuarios/tabla', 
        {
            method: "GET"
            
            });
    

   
    
    if(!res.ok){
        const msg = `error en fetchUsuarios:, ${res.status}`;
        throw new Error(msg);
    }

    
    
    res.json()
    .then(data => {
       // console.log('data', data);
        usuarios = data.usuarios;
       // console.log('lista:', usuarios);

    

        var select = document.getElementById("tecnico");
    
    

        usuarios.forEach((item, index)=>{
        var option = document.createElement("option");
        option.text = item.userid;
        select.add(option);
       

        });


    

    });

}


fetchUsuarios();

//formatear las firmas de cliente y tecnico


var wrapper1 = document.getElementById("signature1"),
    canvas1 = wrapper1.querySelector("canvas"),
    signaturePad1;

var wrapper2 = document.getElementById("signature2"),
    canvas2 = wrapper2.querySelector("canvas"),
    signaturePad2;

    function resizeCanvas(canvas) {
        var ratio = Math.max(window.devicePixelRatio || 1, 1);
        canvas.width = canvas.offsetWidth * ratio;
        canvas.height = canvas.offsetHeight * ratio;
        canvas.getContext("2d").scale(ratio, ratio);
    }

    resizeCanvas(canvas1);
    signaturePad1 = new SignaturePad(canvas1);

   resizeCanvas(canvas2);
   signaturePad2 = new SignaturePad(canvas2);

//Calculo de las horas normales y totales

let fechaFin = '';
let fechaInicio = '';

   function calcHoras(){

    var inicio = document.getElementById('inicio').value;
    var fin = document.getElementById('fin').value;

    
    let inipartes = inicio.split('T');
        fechaInicio = inipartes[0];
    let horaInicio = inipartes[1];


    let finpartes = fin.split('T');
        fechaFin = finpartes[0];
    let horaFin = finpartes[1];

    let nor = '';
    var horainipartes = horaInicio.split(':');
    var horainiparte = horainipartes[0];
    var minuiniparte = horainipartes[1];
    console.log('partesIni: ', horainiparte, minuiniparte);

    var horafinpartes = horaFin.split(':');
    var horafinparte = horafinpartes[0];
    var minufinparte = horafinpartes[1];
    

    normalhora = parseInt(horafinparte) - parseInt(horainiparte);
    normalminuto = parseInt(minufinparte) - parseInt(minuiniparte);

    if(normalminuto < 0){
        normalhora = normalhora - 1;
        normalminuto = 60 + normalminuto;
        console.log('minutosNormales1: ', normalminuto);
        
    }
     if(normalminuto < 10 ){
       
        normalminuto = '0'+normalminuto;
        console.log('minutosNormales2: ', normalminuto);
    }
    nor =   normalhora.toString() +':'+ normalminuto.toString();

    document.querySelector('input[id="normales"]').value = nor;

    var lab = document.getElementById('lab').value;
    var viaje = document.getElementById('viaje').value;

    if (lab != ''){
        var labpar = lab.split(':');
        var labhora = parseInt(labpar[0]);
        var labmin = parseInt(labpar['1']);
    } else{labhora = 0, labmin = 0} 
    
    if( viaje != ''){
        var viajepar = viaje.split(':');
        var viajehora = parseInt(viajepar[0]);
        var viajemin = parseInt(viajepar['1']);
    }else{ viajehora =0, viajemin = 0}

    var totaleshora = normalhora + labhora +viajehora;
    var totalesmin = normalminuto + labmin + viajemin;

    console.log('minutos totales:', totalesmin);
    if(totalesmin > 120){
        totalesmin = totalesmin -120;
        totaleshora = totaleshora + 2;
    }
    if(totalesmin > 60){
        totalesmin = totalesmin - 60;
        totaleshora = totaleshora + 1;
    }
    if( totalesmin < 10){
        totalesmin = '0' + totalesmin;
    }

    var totales = totaleshora.toString()+':'+totalesmin.toString();

    document.querySelector('input[id = "totales"]').value = totales;


   }

//funciones para reset de firmas

function signatureClear1() {
    //console.log('clear signature1');
    signaturePad1.clear();
  }

  function signatureClear2() {
    //console.log('clear signature2');
    signaturePad2.clear();
  }

  //Campos del formulario

  var formulario = document.getElementById("formulario");

var tecnico = [] = '';

let cliente = '';
let descripcion = '';
let marca = '';
let modelo = '';
let serie = '';
let motivo = '';
let tipoTabajo = '';
let presupuesto = '';

let horasNormales = '';
let horasLab = '';
let horasViaje = '';
let horasTotales = '';
let servicio = '';
let obs = '';
let recibido = '';
let ci = '';
let fecha = '';
let firmaCliente = '';
let firmaTecnico = '';

//Validar que los campos indicados con * sean llenados


document.addEventListener('DOMContentLoaded', ()=>{
    document.getElementById('formulario').addEventListener('submit', 
    validarFormulario);
});
function validarFormulario(evento) {
    evento.preventDefault();
    
    tecnico = document.getElementById('tecnico').value;
    console.log('tecnico/s:', tecnico);
    if(tecnico.length == 0){
        alert('falta completar campo Tecnicos');
        return;
    }
    
    for( var option of document.getElementById('tecnico').options){
        if(option.selected){
            console.log('seleccionado:', option.value);
            
            tecnico.push(option.value);
        }
    }
    
    cliente = document.getElementById('cliente').value;
    if(cliente.length == 0){
        alert('falta completar campo Cliente');
        return;
    }

    descripcion = document.getElementById('descripcion').value;
    if(descripcion.length == 0){
        alert('falta completar campo Descripcion');
        return;
    }

    marca = document.getElementById('marca').value;
    if(marca.length == 0){
        alert('falta completar campo Marca');
        return;
    }

    modelo = document.getElementById('modelo').value;
    if(modelo.length == 0){
        alert('falta completar campo Modelo');
        return;
    }

    serie = document.getElementById('serie').value;
    if(serie.length == 0){
        alert('falta completar campo Serie');
        return;
    }

    motivo = document.getElementById('motivo').value;
    if(motivo.length == 0){
        alert('falta completar campo Motivo');
        return;
    }

    if(nor.length == 0){
        alert('falta completar campo Horas Normales');
        return;
    }

    if(totales.length == 0){
        alert('falta completar campo Horas Totales');
        return;
    }

    servicio = document.getElementById('servicio').value;
    if(servicio.length == 0){
        alert('falta completar campo Servicio realizado');
        return;
    }

    fecha = document.getElementById('fecha').value;
    if(fecha.length == 0){
        alert('falta completar campo Fecha de elaboracion');
        return;
    }


    let base64 = signaturePad1.toDataURL('image/png').split(';base64,')[1];
    firmaCliente = base64;

    let base64T = signaturePad2.toDataURL('image/png').split(';base64,')[1];
    firmaTecnico = base64T;

   
    if(firmaCliente.length == 0){
        alert('falta completar campo Firma del cliente');
        return;
    }

   
    if(firmaTecnico.length == 0){
        alert('falta completar campo Firma del tecnico');
        return;
    }

    

    const radioB = document.querySelectorAll('input[name= "trabajo"]');
    const radioB2 = document.querySelectorAll('input[name= "presu"]');
       
    for( const radiobutton of radioB) {
        if(radiobutton.checked){
            tipoTrabajo = radiobutton.value;
        }else{
            alert('falta completar tipo de trabajo');
            return;
        }
    }

    for( const radiobu2 of radioB2){
        if(radiobu2.checked){
            presupuesto = radiobu2.value;
        }else {
            alert('falta completar el campo Presupuesto');
            return;
        }
    }

    let _body = {tecnico, cliente, descripcion, marca, modelo, serie, 
        motivo, tipoTrabajo, presupuesto, fechaInicio, horaInicio, 
        fechaFin, horaFin, horasNormales, horasLab, horasViaje, 
        horasTotales, servicio, obs, recibido, ci, firmaCliente, firmaTec, 
        fecha };

console.log('datos a enviar: ', _body);

   this.submit(); 
   console.log('submit valido');
   
}


