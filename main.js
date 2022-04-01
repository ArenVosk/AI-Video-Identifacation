function setup(){
    canvas = createCanvas(380, 380);
    canvas.center();

    video = createCapture(VIDEO);
    video.hide();
}

function start(){
    objectDetector = ml5.objectDetector("cocossd", modelLoaded);
    document.getElementById("status").innerHTML = "Status: Detecting Objects";
}

function modelLoaded(){
    console.log("Model Has Been Loaded");
    status = true;
    video.loop();
    video.speed(1);
    video.volume(0);
}

function draw(){
    image(video, 0, 0, 480, 380);
    if(status != 0)
    {
        objectDetector.detect(video, gotResult);
        for(i = 0; i <objects.length; i++)
        {
            document.getElementById("status").innerHTML = "Status: Objects Detected";
            document.getElementById("number_of_objects").innerHTML = "Number of Objects Detected Are: "+objects.length;

            fill('#FF0000');
            percent = floor(objects[i].confindence * 100);
            text(objects[i].label+ " " + percent+ "%", objects[i].x + 15, objects[i].y + 15);
            noFill();
            stroke('#FF0000');
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
        }
    }
}

function gotResult(error, results){
    if(error){
        console.error();
    }
    else
    {
        console.log(results);
        objects = results;
    }
} 