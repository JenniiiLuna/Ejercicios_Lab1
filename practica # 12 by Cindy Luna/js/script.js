//Arreglo de canciones con informacion como titulo, artista, ruta de rchivo y portada
const songs = [
    {title: 'Hilito', artist: 'Romeo Santos - Aventura', src: 'music/musica1.mp3', cover: 'img/img1.jpg'},
    {title: 'Centavito', artist: 'Romeo Santos - Aventura', src: 'music/musica2.mp3', cover: 'img/img2.jpg'},
    {title: 'Imitadora', artist: 'Romeo Santos - Aventura', src: 'music/musica3.mp3', cover: 'img/img3.jpg'},
    {title: 'El perdedor', artist: 'Romeo Santos - Aventura', src: 'music/musica4.mp3', cover: 'img/img4.jpg'},
    {title: 'Inmortal', artist: 'Romeo Santos - Aventura', src: 'music/musica5.mp3', cover: 'img/img5.jpg'},
];

// Indice de la cancion actual en reproduccion
let currentSongIndex = 0;

//variable para rastrear si la musica esta reproduciendose o no
let isPlaying = false;

//Objeto que representa la instancia de reproduccion de audio usando la biblioteca Howler.js
let audio;


//Funcion para cargar y reproduci l cancion actual
function playCurrentSong(){
    //Deten de la repruccion si hay una instancia de audio previa
    if (audio){
        audio.stop();
    }

// Crea una nueva instancia de reproduccion de audio con la cancion actual
audio = new Howl({
    src: [songs[currentSongIndex].src],
    autoplay: isPlaying, // Reproduce automaticamente si la musica esta en reproduccion 
    volume: volumeSlider.value, // Establece el volumen inicial
    onend: function (){
        //cuando la cancion actual termina, reproduce la siguiente
        playNextSong();
    }
});
// Actualiza la informacion de la cancion en la interfaz
updateSongInfo();

}

//Elementos de la interfaz obtenidos por su ID
const playButton = document.getElementById('play');
const pauseButton = document.getElementById('pause');
const nextButton = document.getElementById('next');
const prevButton = document.getElementById('prev');
const volumeSlider = document.getElementById('volume');
const songTitlle = document.getElementById('songTitle');
const songArtist = document.getElementById('songArtist');
const albumCover = document.querySelector('.card-img-top');

//Evento para el boton de reproduccion
playButton.addEventListener('click', () => {
    isPlaying = true; // se establece el estado de no reproduccion
    playCurrentSong(); // llama a la funcion para reproducir la cancion actual

});

// Evento para el boton de pausa
pauseButton.addEventListener('click', () => {
    isPlaying = false; // se establece el estado de no reproduccion
    audio.pause(); // pausa la reproduccion de audio
});

//Evento para el boton de siguiente cancion
nextButton.addEventListener('click', () =>{
    playNextSong(); // llama a la funcion para reproducir la siguiente cancion
});

// Evento para el boton de la cancion anterior 
prevButton.addEventListener('click', () => {
    //si la reproduccion actual esta mas alla de los primeros 5 segundos, reinicia la cancion
    if (audio.seek() > 5) {
        audio.seek(0);
    }else{
        // si no, cambia a la cancion anterior y la reproduce
        currentSongIndex = (currentSongIndex - 1 + songs.length) % songs.length;
        playCurrentSong();
    }
});

// Evento para el deslizador de volumen
volumeSlider.addEventListener('input', () => {
    //actualiza el volumen durante el deslizamiento
    audio.volume(volumeSlider.value);
});

// Funcion para actualizar la informacion de la cancion actual en la interfaz
function updateSongInfo(){
    songTitlle.textContent = songs[currentSongIndex].title;
    songArtist.textContent = songs[currentSongIndex].artist;
    albumCover.src = songs[currentSongIndex].cover;
}

//Funcion para reproducir la siguiente cancion
function playNextSong(){
    currentSongIndex = (currentSongIndex + 1) % songs.length; // cambia a la siguiente cancion en el ciclo
    playCurrentSong(); // Llama a la funcion para reproducir la nueva cancion
}

//Reproduce la primera cancion al cargar la pagina
playCurrentSong();