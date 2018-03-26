
var json;
var xhr = new XMLHttpRequest();
console.log ('start');
xhr.onreadystatechange = function() {
  if (xhr.readyState == 4 && xhr.status == 200) {
    //
    json = JSON.parse(xhr.responseText);
    //console.log(json.title);
    //console.log(json.translations[0].url);
    const org_date = new Date(json.translations[0].last_edit);
    const l10n_date = new Date(json.last_edit);
    console.log(org_date);
    console.log(l10n_date);
    var timediff = org_date.getTime() - l10n_date.getTime();
    if (timediff > 0) {
      const datediff = Math.floor(timediff/(24*3600000));
      console.log('This page is ' + datediff + ' days older!!');
      // Highlight edit UI
      //var el = document.querySelector(".page-buttons-edit");
      var el = document.querySelector(".document-actions");
      //el.setAttribute('border: red 1px;');
      el.style.backgroundColor = 'orange';

      // Add datediff text
      el = document.querySelector("#edit-button");
      var insText = datediff > 30 ?
        document.createTextNode('(' + Math.floor(datediff / 30) + ' months older)') :
        document.createTextNode('(' + datediff + ' days older)');
      el.parentNode.insertBefore(insText, el.nextSibling);

    } else {
      console.log('This page is up-to-date!!');
    }
  }
}
var url = document.URL
	.replace(/#.*/, '')
	.replace(/$.*/, '');
console.log(url);

if (/developer\.mozilla\.org\/en-US\//.test(url) == false) {
  xhr.open("GET", url + '$json');
  xhr.send(null);
}

//console.log ('done');
