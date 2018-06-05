export class Doctor {
  constructor(name,symptom,location,page = 10 ) {
    this.name = name;
    this.symptom = symptom;
    this.location = location;
    this.page = page;
  }

  search(getElements) {
    let xml = new XMLHttpRequest();
    let url = `https://api.betterdoctor.com/2016-03-01/doctors?name=${this.name}&query=${this.symptom}&location=${this.location}&limit=${this.page}&user_key=c09b8985b601ceefd94ee8963a48f646`;
    xml.onreadystatechange = function() {
      if(this.readyState === 4 && this.status === 200) {
        let response = JSON.parse(this.responseText);
        getElements(response);
      }
    }
    xml.open("GET",url,true);
    xml.send();
  }
}