import { Doctor } from './doctors.js';
import './styles.css';
import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

$(document).ready(function() {
  $(".search").submit(function(event) {
    event.preventDefault();
    let name = $("#name").val();
    let symptom = $("#symptom").val();
    let location = $("#location").val();
    let results = parseInt($('#result').val() );
    let doctorSearch = new Doctor(name,symptom,location,results);
    let getElements = function(response) {

      if(response.data != 0 ) {
        $("#results").empty();

        for(let i=0; i<response.data.length; i++) {
            $("#results").append("<h1><b>Doctor's Information</b></h1>");
          
            $("#results").append("<img src=" (response.data[i].profile.image_url ) + ">")
            $("#results").append("<li><b>Name:</b> " (response.data[i].profile.first_name).replace(/"/g,"") + " " (response.data[i].profile.last_name).replace(/"/g,"") + "</li>")
            $("#results").append("<li><b>Bio:</b> " (response.data[i].profile.bio) + "</li>")

            if(response.data[i].practices.length != 0)  {
              $("#results").append("<li><b>Employeer:</b> " + (response.data[i].practices[0].name).replace(/"/g,"") + "</li>");
              if( typeo(response.data[i].practices[0].website) ) != 'undefined') {
                $("#results").append("<li><b>Website:</b> <a href=" + (response.data[i].practices[0].website)+ "/a>" (response.data[i].practices[0].website).replace(/"/,"") + "</li>");
              }
              $("#results").append("<li><b>Description:</b> " + (response.data[i].practices[0].description)+ "</li>");
              $("#results").append("<li><b>Accept New Pattients:</b> " + (response.data[i].practices[0].accepts_new_patients)+ "</li>");

              $("#results").append("<li><b>Address:</b> " + (response.data[i].practices[0].visit_address.street ) + " , " (response.data[i].practices[0].visit_address.street2 )  + "</li>");
              $("#results").append("<li><b>City:</b> "  (response.data[i].practices[0].visit_address.city ).replace(/"/g,"")   + "</li>");
              $("#results").append("<li><b>State:</b> "  (response.data[i].practices[0].visit_address.state_long ).replace(/"/g,"")   + "</li>");
              $("#results").append("<li><b>City:</b> "  (response.data[i].practices[0].visit_address.city ).replace(/"/g,"")   + "</li>");
              $("#results").append("<li><b>Zip: </b>"  (response.data[i].practices[0].visit_address.zip ).replace(/"/g,"")   + "</li>");

              if( response.data[i].practices[0].phones.length != 0) {
                $("#results").append("<li><b>Phone:</b> "  (response.data[i].practices[0].phones ).toString().replace(/"/g,"").replace(/{/g,"").replace(/,/g,"\n").replace(/}/g,"").replace(/\[/g,"").replace(/\]/g,"").replace("type:landline",",").replace("number:","").replace("type:fax","")    + "</li>");
              }

            }
            $("#results").append("<b><hr class=\"my-4\"></b>");
        }

      } else {
        $("#results").empty();
        $("#results").append("<li id=\"warning\">I'm sorry an error occurred and we cannot find any doctors in our database that can treat your " + symptom + "</li>")
      }
    }
    doctorSearch.search(getElements);

  });
});
