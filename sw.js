// asignar nombre y version de la cache
const CACHE_NAME='V1_cache_LL_PWA';

// configuracion de los ficheros a subir a la cache de la aplicacion.
 var urlsToCache = [
    './',
    './css/styles.css',
    './facebook.png',
    './img/icono.png',
    './img/icono (1).png',
    './img/icono (2).png',
    './img/icono (3).png',
    './img/icono (4).png',
    './img/icono (5).png',
    './img/icono (6).png',
    './img/icono (7).png',
    './img/icono (/).png',
    './img/icono (8).png',
    './img/icono (9).png',
    './img/icono (10).png',
    './instragram.png',
    './twitter.png'

 ];

 //Evento del ServerWorker
//Evento Install
//se encarga de la instalacion del SW
//guarda en cache los recursos estáticos
//a variable self permite recoger

self.addEventListener('install', e =>{
e.waitUntil(
caches.open(CACHE_NAME)
    .then(cache => {
        // le mandamos los elementos que tenemos en el array

        return cache.addAll(urlsToCache)
        .then(()=>{
            self.skipWaiting();
        })


    })
    .catch(err=> console.log('No se ah registrado el Cache',err))
);
});

// evento activete
// este evento permite que la aplicacion funcione offline.

self.addEventListener('activate', e=>{
const cacheWhitelist = [CACHE_NAME];

// que el evento espere a que termine de ejecutar
e.waitUntil(
caches.keys()
    .then( cacheNames => {
        return Promise.all(
            cacheNames.map(cacheName => {

                if(cacheWhitelist.indexOf(cacheName )== -1)
                {
                    //borrar elementos que no se necesitan.
                    return cache.delete(cacheName);
                }
            })

        );
    })
    
    .then(()=>{
        self.clients.claim(); // activa todo el cache del dispositivo

    })
);

})

// checa si ya tiene los recursos en cache y si no los solicita.

self.addEventListener('fetch', e => {

    e.respondWith(
        caches.match(e.request)
            .then(res => {
                if(res){
                    // devuelvo los datos al cache
                    return res;
                }
                return fetch(e.request); //hago peticion al servidor en caso de que este no este en el cache


            })
    );

});



