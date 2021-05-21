Prediction_1="";
Prediction_2="";

Webcam.set({
    height: 300,
    width: 350,
    image_format: "png",
    png_quality: 90
});

camera = document.getElementById("camera");
Webcam.attach('#camera');

function take_snapshot(){
    Webcam.snap(function(data_uri){
        document.getElementById("result").innerHTML = '<img id = "captured_image" src = "'+data_uri+'"/>'
    });
}

console.log("ml5 version", ml5.version);

Classifier = ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/NsdxK-Kca/model.json', modelLoaded);
function modelLoaded(){
    console.log("Model Loaded!");
}

function speak(){
    var synth=window.speechSynthesis;
     speak_data1 = "The first prediction is"+Prediction_1;
     speak_data2 = " and the second prediction is"+Prediction_2;
     var utterThis = new SpeechSynthesisUtterance(speak_data1+speak_data2);
     synth.speak(utterThis);
    }

function check(){
    img = document.getElementById("captured_image");
    Classifier.classify(img, gotResult);
}

function gotResult(error, results){
    if(error){
        console.log(error);
    }
    else{
        console.log(results);
        document.getElementById("emotion_name").innerHTML=results[0].label;
        document.getElementById("emotion_name2").innerHTML=results[1].label;
        Prediction_1=results[0].label;
        Prediction_2=results[1].label;
        speak();

        if(results[0].label == "Happy"){
            document.getElementById("update_emoji").innerHTML="&#128515;";
        }
        if(results[0].label == "Sad"){
            document.getElementById("update_emoji").innerHTML="&#128532;";
        }
        if(results[0].label == "Angry"){
            document.getElementById("update_emoji").innerHTML="&#128548;";
        }
        if(results[1].label== "Happy"){
            document.getElementById("update_emoji2").innerHTML="&#128522;";
        }
        if(results[1].label == "Sad"){
            document.getElementById("update_emoji2").innerHTML="&#128546;";
        }
        if(results[1].label == "Angry"){
            document.getElementById("update_emoji2").innerHTML="&#128545";
        }

    }
}