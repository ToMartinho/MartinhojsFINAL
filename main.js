/* ----------------------------------------------------  CLASES  --------------------------------------------------*/

// se crea la clase de RESERVA
class Reserva{
    constructor(nombre,apellido,dni,cancha,dia,horario){
        this.nombre = nombre;
        this.apellido = apellido;
        this.dni = dni;
        this.cancha = cancha;
        this.dia = dia;
        this.horario = horario;
    }
}
/* ----------------------------------------------------  FIN CLASES  -----------------------------------------------*/ 

/* ----------------------------------------------------  FUNCIONES  ------------------------------------------------*/  
// se crea funcion para crear reservas
const crearReserva = () =>{
    const crearReserva = document.querySelector("#crearReserva")
    crearReserva.addEventListener("submit",(e)=>{
        e.preventDefault();
        const nombre = e.target.children["nombre"].value;
        const apellido = e.target.children["apellido"].value;
        const dni = e.target.children["dni"].value;
        const cancha = e.target.children["cancha"].value;
        const dia = e.target.children["dia"].value;
        const horario = e.target.children["horario"].value;
        
        // se verifica que no coincidan las reservas
        verificarReserva(reservas,dia,horario,cancha)
        // creamos la nueva reserva
        if(disponible != true){
            Swal.fire({
                icon: 'error',
                title: 'RESERVA',
                text: 'El dia y horario seleccionado ya se encuentra reservado, pruebe nuevamente ingresando un nuevo dia y horario',
                footer: 'Gracias por utilizar el servicio de reservas de FF5'
            })
            // reseteamos el formulario
            crearReserva.reset();
            return disponible = true;
        }else{
            const reserva = new Reserva(nombre,apellido,dni,cancha,dia,horario)
            reservas.push(reserva);
            // lo transferimos al storage
            localStorage.setItem("reservas",JSON.stringify(reservas));
            verReserva(reserva);        
            // reseteamos el formulario
            crearReserva.reset();
        }
    })
}

// se crea una funcion para ver LA reserva realizada
const verReserva = (reserva) =>{
    const tablaReservas = document.querySelector("#tablaReservas");
    const trReserva = document.createElement("tr");
        trReserva.innerHTML = `
                        <td>${reserva.nombre}</td>
                        <td>${reserva.apellido}</td>
                        <td>${reserva.dni}</td>
                        <td>${reserva.cancha}</td>
                        <td>${reserva.dia}</td>
                        <td>${reserva.horario}</td>
        `
        tablaReservas.append(trReserva);
}

// se crea una funcion para ver LAS reservas realizadas
const verReservas = () =>{
    
    reservas.forEach(reserva => {
        verReserva(reserva)
    });
    
}

// se crea funcion para verificar la coincidencia de reservas
function verificarReserva(reservas,dia,horario,cancha){
    // se buscan el dia y el horario
    reservas.forEach((reserva)=>{
        if((reserva.dia == dia) && (reserva.horario == horario) && (reserva.cancha == cancha)){
            // si el horario ya se encuentra reservado
            return disponible = false;            
        }          
    })
    if(disponible == true){
        Swal.fire({
            icon: 'success',
            title: 'RESERVA',
            text: 'La reserva se verifico y realizo correctamente',
            footer: 'Gracias por utilizar el servicio de reservas de FF5'
        })
        return disponible = true;
    }
    
}

// se crea funcion para cancelar la reserva
const cancelarReserva=()=>{
    const eliminarReserva = document.querySelector("#eliminarReserva");
    eliminarReserva.addEventListener("submit",(e)=>{
        const dni = e.target.children["dni"].value;
        const reservas = JSON.parse(localStorage.getItem("reservas"));
        const index = reservas.findIndex((reserva)=> reserva.dni == dni);
        if(index != -1){
            reservas.splice(index,1);
            localStorage.setItem("reservas",JSON.stringify(reservas));
            alert("su reserva a sido cancelada exitosamente");
        }else{
            alert("el dni ingresado no posee ninguna reserva");
        }
    })
    eliminarReserva.reset();
}


/* ----------------------------------------------------  FIN FUNCIONES  -----------------------------------------------*/

/* -------------  VARIABLES  -----------*/  

const reservas = JSON.parse(localStorage.getItem("reservas")) ?? [];
let disponible = true;

/* ------------  FIN VARIABLES  ---------*/  

/*--------------------------------------------------    MAIN   ---------------------------------------------------- */

// llamamos a los metodos

verReservas();
crearReserva();
cancelarReserva();


/*--------------------------------------------------   FIN MAIN   ---------------------------------------------------- */