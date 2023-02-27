
Notification.requestPermission(function(status) {
    console.log('Notification permission status:', status);
});


//insertar datos del qr scan

/*
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
*/
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
/*
var fechaInicio = '';
var horaInicio = '';
var fechaFin = '';
var horaFin = '';
var hnormales = '';
var htotales = 0;
var mtotales = 0;
var total = '';

var inicio = document.getElementById('inicio');
inicio.addEventListener('change', (e) =>{
    inicio = e.target.value;
   
    let inipartes = inicio.split('T');
    fechaInicio = inipartes[0];
    horaInicio = inipartes[1];
   
    
    
}); 

var fin = document.getElementById('fin');
fin.addEventListener('change', (e) =>{
    fin = e.target.value;
    
    let finpartes = fin.split('T');
    fechaFin = finpartes[0];
    horaFin = finpartes[1];

    hnormales = normales();
    console.log('horas normales: ', hnormales);

    document.getElementById("normales").value =
    document.getElementById("normales").defaultValue = hnormales; 
    
    total = totales(hnormales);
    console.log('total:', total);

    document.getElementById("totales").value =
    document.getElementById("totales").defaultValue = total; 


}); 

function normales(){
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
        normalhora = normalhora +1;
        normalminuto = Math.abs(normalminuto);
        
    }else if(normalminuto < 10 ){
       
        normalminuto = '0'+normalminuto;
    }
    nor =   normalhora +':'+ normalminuto;
    
    return nor;
}

function totales(h){
    var tot = '';

    
    var hr = h.split(':');
    var hora = parseInt(hr[0]);
    var minuto = parseInt(hr[1]);
    console.log('minuto: ', minuto);
    console.log('mtotales: ', mtotales);
    htotales = htotales + hora;
    mtotales = parseInt(mtotales) + minuto;
    console.log('minutosTotales', mtotales);
    if(mtotales >= 60){
        mtotales = mtotales - 60;
        htotales = htotales + 1;
    }
    if(mtotales < 10){
        mtotales = '0'+ mtotales;
    }



    tot = htotales.toString() +':'+ mtotales.toString();

    return tot;

    

}

var lab = document.getElementById('lab');
lab.addEventListener('change', (e) =>{
    lab = e.target.value;
    console.log('hlab:', lab);
    total = totales(lab);
    console.log('horas totales: ', total);

    document.getElementById("totales").value =
    document.getElementById("totales").defaultValue = total; 

});
if(lab.value == '00:00:00'){
    lab = '00:00:00';
}

var hvj = document.getElementById('viaje');
hvj.addEventListener('change', (e) =>{
    hvj = e.target.value;
    console.log('hviaje:', hvj);
    total = totales(hvj);
    console.log('Totales: ', total)

    document.getElementById("totales").value =
    document.getElementById("totales").defaultValue = total; 
});
if(hvj.value == '00:00:00'){
    hvj = '00:00:00';
}
*/







let fechaFin = '';
let horaFin = '';
let fechaInicio = '';
let horaInicio = '';


   function calcHoras(){

    var inicio = document.getElementById('inicio').value;
    var fin = document.getElementById('fin').value;

    
    let inipartes = inicio.split('T');
        fechaInicio = inipartes[0];
        horaInicio = inipartes[1];


    let finpartes = fin.split('T');
        fechaFin = finpartes[0];
        horaFin = finpartes[1];

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
    nor =   normalhora +':'+ normalminuto;

    document.querySelector('input[id="normales"]').value = nor;
   

    var lab = document.getElementById('lab').value;
    var viaje = document.getElementById('viaje').value;

    if (lab != ''){
        var labpar = lab.split(':');
        var labhora = parseInt(labpar[0]);
        var labmin = parseInt(labpar[1]);
    } else{labhora = 0, labmin = 0} 
    
    if( viaje != ''){
        var viajepar = viaje.split(':');
        var viajehora = parseInt(viajepar[0]);
        var viajemin = parseInt(viajepar[1]);
    }else{ viajehora =0, viajemin = 0}

    var totaleshora = parseInt(normalhora) + parseInt(labhora) + parseInt(viajehora);
    var totalesmin = parseInt(normalminuto) + parseInt(labmin) + parseInt(viajemin);

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

    var totales = totaleshora+':'+totalesmin;

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

  var tecnico = [];
  var cliente = '';
  let descripcion = '';
  let marca = '';
  let modelo = '';
  let serie = '';
  let motivo = '';
  let tipoTrabajo = '';
  let presupuesto = '';
  
  let horasNormales = '';
  let horasLab = '0:00';
  let horasViaje = '0:00';
  let horasTotales = '';
  let servicio = '';
  let obs = '';
  let recibido = '';
  let ci = '';
  let fecha = '';
  let firma = '';
  let firmaT = '';
  
  
  
  
    function validar(e) {
          e.preventDefault();
          const radioB = document.querySelectorAll('input[name= "trabajo"]');
          const radioB2 = document.querySelectorAll('input[name= "presu"]');
          
          
  
          for( const radiobutton of radioB) {
              if(radiobutton.checked){
                  tipoTrabajo = radiobutton.value;
              }
          }
  
          for( const radiobu2 of radioB2){
              if(radiobu2.checked){
                  presupuesto = radiobu2.value;
              }
          }
          
          var tec = document.getElementById("tecnico").value;
          //console.log('Tecnico/s:', tec);
          cliente = document.getElementById("cliente").value;
          motivo = document.getElementById("motivo").value;
         
          
          servicio = document.getElementById("destrabajo").value;
          firma = document.getElementById("firma");
          firmaT = document.getElementById("firmaT");
          fecha = document.getElementById("fecha").value;
          
          obs = document.getElementById("obs").value;
          recibido = document.getElementById("recibido").value;
          ci = document.getElementById("ci").value;
          
  
  
          
          if(tec == 0 || cliente == 0 || motivo == 0 ||  
               fechaInicio == 0 || fechaFin == 0 || servicio == 0  
              || fecha == 0 || signaturePad1.isEmpty() || 
              tipoTrabajo == 0 || presupuesto == 0 || signaturePad2.isEmpty()  ){
              e.preventDefault();
              alert('Error, los campos marcados con * deben ser completados');
              return;
  
          }else {
              e.preventDefault();
              //var selected = [];
              for( var option of document.getElementById('tecnico').options){
                  if(option.selected){
                      tecnico.push(option.value);
                  }
              }
              
              }
        
          
              console.log('tecnico/s: ', tecnico);
       descripcion = document.getElementById("descripcion").value;
       marca = document.getElementById("marca").value; 
       modelo = document.getElementById("modelo").value;
       serie = document.getElementById("serie").value;
       
  
  
  
       let base64 = signaturePad1.toDataURL('image/png').split(';base64,')[1];
       firma = base64;
   
       let base64T = signaturePad2.toDataURL('image/png').split(';base64,')[1];
       firmaT = base64T;
      //console.log(base64);
  
  
     
      
      console.log('cliente seleccionado:', cliente);
      console.log('Motivo de la visita.', motivo);
      horasNormales = document.getElementById('normales').value;
      horasLab = document.getElementById('lab').value;
      horasViaje = document.getElementById('viaje').value;
      horasTotales = document.getElementById('totales').value ;
      
      
  
      let _body = {tecnico, cliente, descripcion, marca, modelo, serie, 
                  motivo, tipoTrabajo, presupuesto, fechaInicio, horaInicio, 
                  fechaFin, horaFin, horasNormales, horasLab, horasViaje, 
                  horasTotales, servicio, obs, recibido, ci, firma, firmaT, 
                  fecha };
  
      console.log('datos a enviar: ', _body);
      //enviar el formulario al service worker
     /*
      var form = { 'formData' : _body };
      navigator.serviceWorker.controller.postMessage(form);
      console.log('datos enviados al sw ');
  
      navigator.serviceWorker.addEventListener('message', e =>{
          if(e.data.form == 'recibido'){
              console.log('sw recibio los datos');
          }
      })
     */ 
    
    }
  
      formulario.addEventListener('submit', validar);
  
