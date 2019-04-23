"strict mode";

// Do a CORS request to get Davis weather hourly forecast

// Create the XHR object.
function createCORSRequest(method, url) {
  let xhr = new XMLHttpRequest();
  xhr.open(method, url, true);  // call its open method
  return xhr;
}

function toggleMenu() {
    console.log("We wanted to toggle");
    var menu = document.getElementById("forecasts");
    var top = document.getElementById("background");
    console.log("We got ", menu);
    console.log("We also got ", top);
    top.classList.toggle("hide");
    menu.classList.toggle("show");
    return;
}

function toggleMenuBack(){
    console.log("In the other ooe");
    var menu = document.getElementById("forecasts");
    var top = document.getElementById("background");
    top.classList.toggle("background");
    menu.classList.toggle("forecasts");
    return;
}

function newLocation()
{
    console.log("We clicked it");

    var location = document.getElementById("input-field").value;
    var tokens = location.split(',');
    console.log("The length of the array is ", tokens.length);
    for(var i = 0; i < tokens.length; i++)
    {
        console.log(tokens[i]);
    }
    var address = "http://api.openweathermap.org/data/2.5/forecast/hourly?q=" + tokens[0] + "," + tokens[1] + "&units=imperial&APPID=96ed4c23f594e2d485971a825906a701";
    var URL = encodeURI(address);
    makeCorsRequest(URL);
    console.log("The new URL is ", URL);

    //Make the new URL

}

function changeImage(icon, cell){
    console.log("IN the function with ", icon)
    console.log(typeof icon)


    switch(icon)
    {
        case '01d':
            cell.src = "assets/clearsky.svg";
            break;
        case '01n':
            cell.src = "assets/clear-night.svg";
            break;
        case '02d':
            cell.src = "assets/fewclouds-day.svg";
            break;
        case '02n':
            cell.src = "assets/fewclouds-night.svg";
            break;
        case '03n':
            cell.src = "assets/scatteredclouds.svg";
            break;
        case '03d':
            cell.src = "assets/scatteredclouds.svg";
            break;
        case '04d':
            cell.src = "assets/brokencloud.svg";
            break;
        case '04n':
            cell.src = "assets/brokencloud.svg";
            break;
        case '09d':
            cell.src = "assets/showerrain.svg";
            break;
        case '09n':
            cell.src = "assets/showerrain.svg";
            break;
        case '10d':
            cell.src = "assets/rain-day.svg";
            break;
        case '10n':
            cell.src = "assets/rain-night.svg";
            break;
        case '11d':
            cell.src = "assets/thunderstorm.svg";
            break;
        case '11n':
            cell.src = "assets/thunderstorm.svg";
            break;
        case '13d':
            cell.src = "assets/snow.svg";
            break;
        case '13n':
            cell.src = "assets/snow.svg";
            break;
        case '50d':
            cell.src = "assets/mist.svg";
            break;
        case '50n':
            cell.src = "assets/mist.svg";
            break;
    }
    return;

}

// Make the actual CORS request.
function makeCorsRequest(url = "http://api.openweathermap.org/data/2.5/forecast/hourly?q=Davis,CA,US&units=imperial&APPID=96ed4c23f594e2d485971a825906a701") {

   //let url = "http://api.openweathermap.org/data/2.5/forecast/hourly?q=Davis,CA,US&units=imperial&APPID=96ed4c23f594e2d485971a825906a701";
 

  let xhr = createCORSRequest('GET', url);


  // checking if browser does CORS
  if (!xhr) {
    alert('CORS not supported');
    return;
  }

  // Load some functions into response handlers.
  xhr.onload = function() {
      
      let responseStr = xhr.responseText;  // get the JSON string 
      let object = JSON.parse(responseStr);  // turn it into an object
      for(i = 0; i < 6; i++)
      {
        var date = new Date(object.list[i].dt * 1000);
        var hours = date.getHours();
        if (hours == 12)
        {
            
            var hoursStr = String(hours) + ":00" + "pm";
        }
        else if (hours > 12)
        {
            hours = hours - 12;
            var hoursStr = String(hours) + ":00" + "pm";
        }
        else
        {
            var hoursStr = String(hours) + ":00" + "am";
        }

        switch(i)
        {   

            case 0:
                //Change this because you can get a time for another time zone 
                var today = new Date();

                
                if (today.getHours() >= 12)
                {
                    console.log("the time is more than 12");
                    var timeStr = today.getHours() - 12;
                    if (today.getMinutes() < 10)
                    {
                        timeStr = timeStr + ":"  + "0" + today.getMinutes()+ " pm";  
                    }
                    else
                    {
                        timeStr = timeStr + ":" + today.getMinutes() + " pm";
                    }
                }
                else{
                    var timeStr = today.getHours();
                    if (today.getMinutes() < 10)
                    {
                        timeStr = today.getHours() + ":" + "0" + today.getMinutes() + " am";
                    }
                    else
                    {
                        timeStr = today.getHours() + ":" + today.getMinutes() + " am";
                    }

                }
                document.getElementById("time-one").innerHTML = timeStr;
                document.getElementById("temp").innerHTML = Math.round(object.list[i].main.temp);
                var cell_obj = document.getElementById("current-icon");
                changeImage(object.list[i].weather[0].icon, cell_obj);
                break;
            case 1:
                console.log("WER ARE HERE");
                document.getElementById("cell-one-time").innerHTML = hoursStr;
                document.getElementById("cell-one-temp").innerHTML = Math.round(object.list[i].main.temp);
                var cell_obj = document.getElementById("cell-one-icon");
                changeImage(object.list[i].weather[0].icon, cell_obj);
                break;


        
           
            case 2:
                document.getElementById("cell-two-time").innerHTML = hoursStr;
                document.getElementById("cell-two-temp").innerHTML = Math.round(object.list[i].main.temp);
                var cell_obj = document.getElementById("cell-two-icon");
                changeImage(object.list[i].weather[0].icon, cell_obj);
                break;
            
            case 3:
                document.getElementById("cell-three-time").innerHTML = hoursStr;
                document.getElementById("cell-three-temp").innerHTML = Math.round(object.list[i].main.temp);
                var cell_obj = document.getElementById("cell-three-icon");
                changeImage(object.list[i].weather[0].icon, cell_obj);
                break;
        
            case 4:
                document.getElementById("cell-four-time").innerHTML = hoursStr;
                document.getElementById("cell-four-temp").innerHTML = Math.round(object.list[i].main.temp);
                var cell_obj = document.getElementById("cell-four-icon");
                changeImage(object.list[i].weather[0].icon, cell_obj);
                break;
        
            case 5:
                document.getElementById("cell-five-time").innerHTML = hoursStr;
                document.getElementById("cell-five-temp").innerHTML = Math.round(object.list[i].main.temp);
                var cell_obj = document.getElementById("cell-five-icon");
                changeImage(object.list[i].weather[0].icon, cell_obj);
                break;
        }

        




        console.log(hours, " with temp ", object.list[i].main.temp);
      }

      //console.log(JSON.stringify(object, undefined, 2));  // print it out as a string, nicely formatted
  };

  xhr.onerror = function() {
    alert('Woops, there was an error making the request.');
  };

  // Actually send request to server
  xhr.send();
}

// run this code to make request when this script file gets executed 
makeCorsRequest();
