//* Modo cliente servidor
/* Que es una api?
Qué es una API
El término API es una abreviatura de Application Programming Interfaces, que en español significa interfaz de programación de aplicaciones. Se trata de un conjunto de definiciones y protocolos que se utiliza para desarrollar e integrar el software de las aplicaciones, permitiendo la comunicación entre dos aplicaciones de software a través de un conjunto de reglas.

Así pues, podemos hablar de una API como una especificación formal que establece cómo un módulo de un software se comunica o interactúa con otro para cumplir una o muchas funciones. Todo dependiendo de las aplicaciones que las vayan a utilizar, y de los permisos que les dé el propietario de la API a los desarrolladores de terceros.

Para que sirven?

Una de las principales funciones de las API es poder facilitarle el trabajo a los desarrolladores y ahorrarles tiempo y dinero. Por ejemplo, si estás creando una aplicación que es una tienda online, no necesitarás crear desde cero un sistema de pagos u otro para verificar si hay stock disponible de un producto. Podrás utilizar la API de un servicio de pago ya existente, por ejemplo PayPal, y pedirle a tu distribuidor una API que te permita saber el stock que ellos tienen.

No es necesario reinventar la rueda
*/

//! Mostrar proyecto pokemon  bootcamp coltsteele/session24/pokemon


//*tipos de peticiones: GET, POST, PUT, DELETE, ETC

//* Peticiones con FETCH

//TODO: url a utilizar:  https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png    ejemplo 2
//todo: url: https://pokeapi.co/api/v2/pokemon    ejemplo 1


let url = 'https://pokeapi.co/api/v2/pokemon/blastoise';
let url2 = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png' // esta api nos devuelve html


// const useFetch = fetch(url)
//     .then(response => response.json()) // con el metodo json lo que hago es que la informacion de la url pueda trabajarlo con js, sin esto me devuelve una promesa
//     .then(data => console.log(data))// con esto resolvemos la promesa y obtenemos los datos
//     .catch((error) => console.log(`Ha ocurrido un problema: ${error}`))

function capturarPokemon() {
    fetch(url)
        .then(response => response.json())
        .then(data => console.log(data))
        .catch((error) => console.log(`Ha ocurrido un problema: ${error}`))
}

async function capturarPokemon2(pokemon) {
    try {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);
        const datos = await response.json();
        const datosEspecificos = datos.abilities[0].ability.name
        console.log(datosEspecificos)
    } 
    catch (error){
        console.log(error)
    }
}

capturarPokemon2('blastoise')


//? ejercicio 1

const input = document.createElement('input'); // si usamos document nos va a causar error la terminal OJO
const button = document.createElement('button');

button.innerText = 'Buscar Temperatura!'

document.body.appendChild(input);
document.body.appendChild(button);

//Hacer esto tambien con su propia funcion asincrona y pasarla al evento

button.addEventListener('click', async() => {
    let pais = input.value;
    let api = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${pais}&appid=616629f9acdc3b22b8b09553e632e5da`)
    let response = await api.json();
    let data = response.main.temp
    console.log(data)
})

//---------------------------------------------------------------------------------------

//* FUNCIONES API REST


//? que es REST? y restful?
/* Representational State Transfer, transferencia de presentacion de estados es una tecnica de arquitectuira de software usada para construir apis que permiten comunicar a nuestro servidor con sus clientes usando el protocolo http mediante urls lo suficientemente inteligentes para satisfacer la necesidad del cliente.

Que es http = Protocolo de transferencia de hipertexto, permite la transferencia de informacion a traves de archivos en la world wide web(red informatica mundial)

En simples palabras es realizar peticiones y obtener informacion de una api, el cual pueda satisfacer las busquedas o lo que quiera hacer el cliente.

Por ultimo restful es la implementacion de esto en el backend(CRUD)
*/

//* Funciones de las apis
//? Post(Create): Enviar -> Cuando enviamos informacion para insertar a un registro de base de datos.
//? Get(Read): Obtener -> es usado para modo lectura, por ejemplo cuando queremos listar a todos los usuarios de nuestra base de datos. Los parametros son enviados a la url
//? PUT(Update): Actualizar -> Cuando queremos actualizar un registro.
//? DELETE(Delete): Eliminar -> Cunado quremos eliminar un registro //no usamos el body

//json stringify transforma un valor js a json
//el content-type indica el medio en el cual vamos a enviar el recurso (JSON)
// explicar que es un endpoint
// enseñar como colocar el boyd o el header en su propia constante


const peticionPost = async(url) => {
    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: json.stringify({
            nombre: 'Paulo',
            apellido: 'Maldonado',
            edad: 30
        })
    })

    const conversionOrData = await response.json()
    console.log(conversionOrData);
}

const peticionPost2 = async() => {

    const url = 'http://jajajaja.com/hahaha'

    let options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json' 
        },
        body: json.stringify(user)
    }
    
    let user = {
        nombre: 'Paulo',
        apellido: 'Maldonado',
        edad: 30
    }

    try{
        const response = await fetch(url, options)
        const data = response.json()
        console.log(data)
    } 
    catch(error){
        console.log(error)
    }
}


//*parametros en las peticiones
//podemos en la url especificar lo que deseamos de la api como tambien cuando usamos el body
//* Query String (Explicarlos con la api del clima)

//todo: https://api.openweathermap.org/data/2.5/weather?q=${pais}&appid=616629f9acdc3b22b8b09553e632e5da

//*Autorizacion en apis(key de la api)

//! Ejercicio grupal ----> realizar consumo a su propia api

async function getValues(){
   
    let url = "https://mytinerary-dansep.herokuapp.com/api/user/signup"
    let values = {
        firstName: document.getElementById('firstname').value,
        lastName: document.getElementById('lastname').value,
        email: document.getElementById('email').value,
        password: document.getElementById('password').value,
        imageUrl: 'hola',
        "country": "Chile",
        "google": false
    }
    let query = {
        method: "POST",
        body: JSON.stringify(values),
        headers: {
            "Content-Type": "application/json"
        }
    }

    try{
        let validate = await fetch(url, query);
        validate = await validate.json()
        console.log(validate)
    } catch (error){
        console.log('error en CONECTARSE')
    }

    console.log(values)
}


btn.addEventListener('click', getValues)


//* AXIOS

//* Get en axios

let url3 = 'https://jsonplaceholder.typicode.com/users';

async function obtenerUsers(){
    let response = await axios.get(url3, {          // el header es opcional... a no ser que requiera autorizar algo
        headers: {                                  // authorization nos los pueden pedir si una api solicita eso
            'Content-Type': 'application/json'
        }
    })
    console.log(response.data) // siempre en axios la informacion estara en data
}
obtenerUsers()

//* POST en axios

const url4 = 'https://mytinerary-dansep.herokuapp.com/api/user/signup';

const bodyAxios = {
    firstName: 'Jorge',
    lastName: 'Vallejos',
    email: 'jorgevallejos@jajaj.cl',
    password: 'contraseña123',
    imageUrl: 'hola',
    "country": "Chile",
    "google": false
} 

async function enviarDatos(){
    let response = await axios.post(url4, bodyAxios) // url, body, header en parametros
    console.log(response.data) // siempre en axios la informacion estara en data
}
enviarDatos()



//validar form con regEx