let boxComments = document.getElementById('box-comments'),
 btnComment = document.getElementById('btnComment'),
 boxCommentPosted = document.getElementById('boxCommentPosted'),
 indice = document.getElementById('indice'),
 oldComments = document.getElementById('oldComments'),
 fecha = new Date();


const agregarComentario = ()=> {
    //LIMPIAR DATOS 
    while(boxCommentPosted.firstChild){
        boxCommentPosted.removeChild(boxCommentPosted.firstChild)
        console.log("Borrado completo")
    }
    //IMPORTAR TODOS LOS MENSAJES
    db.collection("inicio").orderBy("fechaCom","asc").get()
    .then((querySnapshot) => {querySnapshot.forEach(function(doc){
            boxCommentPosted.insertAdjacentHTML('afterbegin',doc.data().mensaje)
            const fechaYhora = document.getElementById("fechaYhora")
            fechaYhora.insertAdjacentHTML('afterbegin',doc.data().fechaCom.toDate())
    })})
    .catch((error)=>{
        console.log(error)
    });
};

agregarComentario();
// TRAETE LA FECHA DESDE OTRO CAMPO APARTE AVER SI TE IMPORTA LOS DATOS ORDENADOS

const limpiarCaja = ()=> {
    boxComments.value = ""
    
};

btnComment.addEventListener('click',()=>{
    if (boxComments.value === ""){
        console.log("No se puede enviar un comentario vacio")
    }else{
        // agregarComentario();
        db.collection("inicio").add({
            mensaje: `<h5 class="commentViejo d-inline-block">Nombre </h5><span id="fechaYhora" class="oldComments ml-2 text-muted"></span>
            <p class="commentViejo">${boxComments.value}</p>
            <hr class="commentViejo"></hr>`,
            fechaCom: firebase.firestore.Timestamp.fromDate(new Date(fecha.toUTCString())),
        })
        .then(function(docRef) {
            console.log("Comentario registrado con exito: ", docRef.id);
            // agregarComentario();}
            window.location.reload();
        })
        .catch(function(error) {
            console.error("Error adding document: ", error);
        });
        
        limpiarCaja();
    }
});

