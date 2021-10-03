let switchToggle = document.querySelector("#switchBtn");
let bodyRef = document.querySelector("body");
let containerRef = document.querySelector(".container");

switchToggle.addEventListener("click", function (event) {
  bodyRef.classList.toggle("dark"); //darkmode
});

let aliasInput = document.querySelector("#aliasName");
let sendBtn = document.querySelector("#sendBtn");

aliasInput.addEventListener("keyup", function () {
  let aliasLength = aliasInput.value.length;
  if (aliasLength > 2) { // När det är mindre än tre tecken i rutan går det inte att skicka iväg namnet.
    sendBtn.disabled = false;
  } else {
    sendBtn.disabled = true;
  }
});

let sol = 1000; // Marsdag
let rover = "Opportunity"; // Namn på rover

// Tar in namn, bild och datum, ger ut ett komplett kort som sedan kan renderas i containern.
function template(name, image, date) {
  return (
    '<article class="card"><h3 class="cardheading">' + name + '</h3><img src="' + image + '" alt="" /><h4 class="carddate">' + date + "</h4></article>");
}

// https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?sol=1000&api_key=DEMO_KEY
fetch( "https://api.nasa.gov/mars-photos/api/v1/rovers/" + rover + "/photos?sol=" + sol + "&api_key=MqVgrOD2gZH0Yupz0m69B2W9BhbTwMRvlWWFtfVJ")
  .then((response) => response.json()) // Gör om datat till JSON
  .then((data) => {
    let images = data.photos; // Hämta bilddata
    if (images.length > 0) {
      // Kolla om det finns data.
      let html = ""; // Sätter en tom sträng till html, så vi kan bygga på med element
      for (let i = 0; i < 4; i++) {
        // Loopar genom dom 4 första!
        html = html + template(
            images[i].rover.name,
            images[i].img_src,
            images[i].earth_date
          ); // Genererar ett kort och lägger till det på html strängen
      }
      containerRef.innerHTML = html; // Sätter html som genererats
    } else {
      containerRef.innerHTML = "<h2>THERE ARE NO IMAGES ON THIS DAY</h2>"; // Vid fel visas denna
    }
  })
  .catch((error) => {
    console.log(error); // Om det blir fel i api anropet logga felet.
  });

sendBtn.addEventListener("click", function (event) {
  event.preventDefault();

  let writeName = document.querySelector(".welcome");
  writeName.innerHTML = "Welcome " + aliasInput.value + "!"; //Skriver ut namnet från inputfältet
 

  aliasInput.value = "";
  if (aliasInput.value === "") {
    sendBtn.disabled = true;
  }
});

aliasInput.addEventListener("focus", function () {
  console.log("Du ställde dig i textrutan");
  aliasInput.classList.toggle("bgBorder");  //När man står i rutan markeras den med ett streck i nederkant
});

aliasInput.addEventListener("blur", function () {
  console.log("Du lämnade rutan");
  aliasInput.classList.toggle("bgBorder"); //Strecket försvinner vilket betyder att man inte står i rutan.
});
