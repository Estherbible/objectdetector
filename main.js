var status = ""
object = []
alarm=""

function setup() {
    canvas = createCanvas(650, 450)
    canvas.center()
    video = createCapture(VIDEO)
    video.size(650, 450)
    video.hide()

    
}

function draw() {
    image(video, 0, 0, 650, 450)
    // text("esther",350, 20)
    // fill("yellow")
    //  rect(250,250,250,250)
    //  noFill()
    if (status) {
        r=random(255)
        g=random(255)
        b=random(255)
        objectDetector.detect(video, gotResult)
        document.getElementById("status").innerHTML = "status: objects detected"
        for (i = 0; i < object.length; i++) {
            fill(r,g,b)
            percent = floor(object[i].confidence * 100) + "%"
            text(object[i].label + " " + percent, object[i].x + 10, object[i].y + 10)
            noFill()
            stroke(r,g,b)
            rect(object[i].x, object[i].y, object[i].width, object[i].height)
            if (object[i].label==item) {
                music.play()
            }

        }
    }
}

function preload(){
    music=loadSound("alarm.mp3")
}

function modelLoaded() {
    console.log("model Loaded");
    objectDetector.detect(video, gotResult)
    status = true
}

function gotResult(error, result) {
    if (error) {
        console.error(error);
    } else {
        console.log(result);
        object = result

    }
}
item=""

function start(){
    item=document.getElementById("object").value
    objectDetector = ml5.objectDetector("cocossd", modelLoaded)
    document.getElementById("status").innerHTML = "status: detecting objects"
}