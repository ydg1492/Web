function multiImage(){

    var files = document.getElementById("in2").files;
    var image = document.getElementById("image");

    image.innerHTML = "";

    for(let i=0; i<files.length; i++){

        let item = document.createElement("div");
        item.className = "item";

        let img = document.createElement("img");

        let p = document.createElement("p");
        p.innerText = files[i].name;

        item.appendChild(img);
        item.appendChild(p);

        image.appendChild(item);

        let fr = new FileReader();

        fr.onload = function(){
            img.src = fr.result;
        }

        fr.readAsDataURL(files[i]);
    }
}