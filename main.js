var status = "";
var objects = [];
var alertme = "";

function setup() {
  canvas = createCanvas(380, 380);
  canvas.center();
  video = createCapture(VIDEO);
  video.hide();
  objectDetection = ml5.objectDetector("cocossd", modelloaded);
  document.getElementById("detail").innerHTML = "Object: Dectecting Objects";
}

function preload()
{
 alertme = loadSound("alert.mp3");
}

function draw() {
  image(video, 0, 0, 380, 380);
  for (var i = 0; i < objects.length; i++) {
     if(objects[i].label == "person")
      {
          document.getElementById('detail').innerHTML = "Baby Is There";
          text("Baby Is" + " " + precent + "%", objects[i].x + 15, objects[i].y + 15);
          r = random(255);
          g = random(255);
          b = random(255);
          fill(r,g,b);
          var precent = floor(objects[i].confidence * 100);
          noFill();
          stroke(r,g,b);
          rect(objects[i].x +15, objects[i].y +15, objects[i].width, objects[i].height);
      }
      else{
        document.getElementById('detail').innerHTML = "Baby Is Not There";
        r = random(255);
        g = random(255);
        b = random(255);
        fill(r,g,b);
        var precent = floor(objects[i].confidence * 100);
        text(objects[i].label + " " + precent + "%", objects[i].x + 15, objects[i].y + 15);
        noFill();
        stroke(r,g,b);
        rect(objects[i].x +15, objects[i].y +15, objects[i].width, objects[i].height);
        alertme.play();
      }
  }
}

function modelloaded() {
  console.log("Model Loaded succssefuly");
  status = true;
  objectDetection.detect(video, gotResult);
}

function gotResult(error, results) {
  if (error) {
    console.log(error);
  } else {
    console.log(results);
    objects = results;
  }
}