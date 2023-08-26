function extractPositiveNumbers(numbersArray) {
    // Verifica si la entrada es un array
    if (!Array.isArray(numbersArray)) {
        throw new Error('La entrada debe ser un array');
    }
    // Verifica que el array no esté vacío.
    if (numbersArray.length === 0) {
        throw new Error('El array no debe estar vacío');
    }
    // Filtra el array para retornar solo los números mayores a 0
    return numbersArray.filter(num => num > 0);
}

try {
    // Array para almacenar los números ingresados por el usuario
    let numbersArray = [];
    let userInput;

    // Bucle para solicitar números al usuario
    do {
        userInput = prompt("Introduce un número (deja en blanco y presiona 'OK' para terminar):");
        
        // Si el usuario ingresa un número (no deja en blanco el campo), procesa la entrada
        if (userInput !== null && userInput.trim() !== "") {
            // Convierte la entrada del usuario a un número
            let number = parseFloat(userInput);
            // Verifica que la entrada convertida sea un número válido
            if (isNaN(number)) {
                throw new Error('Entrada no válida. Debes ingresar un número.');
            }
            // Agrega el número válido al array
            numbersArray.push(number);
        }

    // El bucle continúa mientras el usuario no deje el campo en blanco y presione 'OK'
    } while (userInput !== null && userInput.trim() !== "");

    // Usa la función para extraer números positivos del array
    let result = extractPositiveNumbers(numbersArray);
    alert(result);
    console.log(result);
} 
// Si ocurre algún error, se muestra el mensaje correspondiente en la consola
catch (error) {
    alert(error.message);
    console.error(error.message);
}