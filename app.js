let input = document.querySelector("#input");
let searchBtn = document.querySelector("#search");
let notFound = document.querySelector(".wordNotFound");
let suggest = document.querySelector(".suggest");
let def = document.querySelector(".def");
let audioBox = document.querySelector(".audio");
let loading = document.querySelector(".loading");

let myApiKey = "cd9d83f2-5049-4b75-ac99-d4afc4844bda";

searchBtn.addEventListener("click", (e) => {
  e.preventDefault();
  audioBox.innerText = "";
  def.innerText = "";
  notFound.innerText = "";
  suggest.innerText="";

  let word = input.value;
  if (word == "") {
    alert("Not found any word");
  }
  gotData(word);
});

async function gotData(word) {
  loading.style.display = "block";
  const response = await fetch(
    `https://www.dictionaryapi.com/api/v3/references/learners/json/${word}?key=${myApiKey}`
  );
  const data = await response.json();

  if (!data.length) {
    loading.style.display = "none";
    notFound.innerText = "No any result found";
    return;
  }
  if (typeof data[0] === "string") {
    loading.style.display = "none";
    let heading = document.createElement("h3");
    heading.innerText = "Did you mean?";
    notFound.appendChild(heading);
    data.forEach((element) => {
      let suggetion = document.createElement("span");
      suggetion.classList.add("suggetionBox");
      suggetion.innerText = element;
      suggest.appendChild(suggetion);
    });
    return;
  }
  loading.style.display = "none";
  let defination = data[0].shortdef[0];
  def.innerText = defination;

  let audio = data[0].hwi.prs[0].sound.audio;
  if (audio) {
    soundAudio(audio);
  }
}
function soundAudio(audio) {
  let subAudio = audio.charAt(0);
  let soundSrc = `https://media.merriam-webster.com/soundc11/${subAudio}/${audio}.wav?kay=${myApiKey}`;
  let aud = document.createElement("audio");
  aud.src = soundSrc;
  aud.controls = true;
  audioBox.appendChild(aud);
}
