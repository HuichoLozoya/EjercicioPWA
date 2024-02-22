// cargar service worker

if  ('serviceWorker' in navigator)
{
console.log("Puedes usar el service Worker");
// configuracion del sw

navigator.serviceWorker.register('./sw.js')

                        .then(res=>console.log('SW cargado correctamente', res))
                        .catch(err => console.log('Service worker no se ah podido cmpletar',err));

}

else
{
console.log("No se puede usar el service Worker");
}