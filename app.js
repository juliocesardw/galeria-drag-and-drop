
const inputGaleria=document.getElementById('inputGaleria');
const errorEle=document.querySelector('.error-msg');
const dropImagen=document.querySelector('.dropImagen');


//CREAMOS LOS ELEMENTOS TAGS
function _crearImagen(rutaImagen){

    const div =document.createElement('div');
    div.setAttribute('class','img');

    const img =document.createElement('img');
    img.setAttribute('src',rutaImagen);

    const button =document.createElement('button');
    button.setAttribute('type','button');
    button.setAttribute('class','delete-img fa-solid fa-times');

    

    div.appendChild(button)
    div.appendChild(img)

    return div;
}

//CARGAR IMAGEN
function _mostrarImagen(imagens){

    errorEle.innerHTML="";
    errorEle.classList.remove('active');

    //formato permitido
    const formato_imagen= ["image/jpeg","image/png","image/jpg"];

    for (var i = 0; i < imagens.length; i++){

        
        if(!((imagens[i].type==formato_imagen[0]) || (imagens[i].type==formato_imagen[1]) || (imagens[i].type==formato_imagen[2]))){

            errorEle.classList.add('active');
            errorEle.innerHTML='<p class="danger">La imagen '+imagens[i].name+' formato no permitido. </p>';
            

        }else if(imagens[i].size > 2000000){

            errorEle.classList.add('active');
            errorEle.innerHTML='<p class="danger">La imagen '+imagens[i].name+' no debe superar los 2MB. </p>';


        } else{

            errorEle.classList.add('active');
            errorEle.innerHTML+='<p class="succes">La imagen '+imagens[i].name+' ha sido subida con éxito.</p>';

            const datos_imagen = new FileReader();
        	
            //imagen la convertimos en un archivo
            datos_imagen.readAsDataURL(imagens[i]);
            const visorImagenes=document.querySelector('.visorImagenes');
    
            datos_imagen.addEventListener('load',function(event){

                const ruta_imagen=event.target.result;
    
                const img=_crearImagen(ruta_imagen);
                visorImagenes.insertBefore(img, visorImagenes.lastElementChild);
    
            })
            
        } 
    }
}

//MOSTRAR VISTA PREVIA DE LAS IMAGENES
inputGaleria.addEventListener('change',(e)=>{
    const imagens=e.target.files;

    _mostrarImagen(imagens);

    //CODIGO OPCIONAL: codigo para no mostrar siempre los mesajes de alerta
    setTimeout(function() {
        errorEle.classList.remove('active');
        errorEle.innerHTML="";
    },4000);

})

//REMOVER IMAGEN
document.querySelector('body .visorImagenes').addEventListener('click',(e)=>{
    if(e.target.classList.contains('delete-img') ){

        const eleRemove=e.target.parentNode;
        eleRemove.style.transform='scale(0)';
        eleRemove.style.opacity='.3';

        
        setTimeout(() => {
            e.target.parentNode.parentNode.removeChild(eleRemove);
        }, 300);

    }
})



//dragover. Ejecuta un JavaScript cuando se arrastra un elemento sobre un destino de colocación:
dropImagen.addEventListener('dragover',(e)=>{
    e.preventDefault();
    e.currentTarget.classList.add('drop-hover');
})

//dragleave. Ejecuta un JavaScript cuando un elemento arrastrable se mueva fuera de un destino de colocación:
dropImagen.addEventListener('dragleave',(e)=>{
    e.currentTarget.classList.remove('drop-hover');
})

//drop. Ocurre cuando un elemento arrastrable es soltado dentro de un contenedor
dropImagen.addEventListener('drop',(e)=>{
    e.preventDefault();

    const imagens=e.dataTransfer.files;

    _mostrarImagen(imagens);

    e.currentTarget.classList.remove('drop-hover');

    //CODIGO OPCIONAL: codigo para no mostrar siempre los mesajes de alerta
    setTimeout(function() {
        errorEle.classList.remove('active');
        errorEle.innerHTML="";
    },4000);

})
