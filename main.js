const logPrefix = 'mdn-l10n-update-checker: '
console.log (logPrefix + 'start');

let json;
let xhr = new XMLHttpRequest();
xhr.onreadystatechange = function() {
  if (xhr.readyState == 4 && xhr.status == 200) {
    //
    json = JSON.parse(xhr.responseText);
    //console.log(json.title);
    //console.log(json.translations[0].url);
    const org_date = new Date(json.translations[0].last_edit);
    const l10n_date = new Date(json.last_edit);
    console.log(logPrefix + org_date);
    console.log(logPrefix + l10n_date);
    const timediff = org_date.getTime() - l10n_date.getTime();
    if (timediff > 0) {
      const datediff = Math.floor(timediff/(24*3600000));
      console.log(logPrefix + 'This page is ' + datediff + ' days older!!');
      // Highlight edit UI
      //var el = document.querySelector(".page-buttons-edit");
      let el = document.querySelector(".document-actions");
      el.style.backgroundColor = 'orange';

      // Add datediff text
      el = document.querySelector("#edit-button");
      const insText = datediff > 30 ?
        document.createTextNode('(' + Math.floor(datediff / 30) + ' months older) ') :
        document.createTextNode('(' + datediff + ' days older) ');
      // el = document.querySelector("#edit-button");
      // el.parentNode.insertBefore(insText, el.nextSibling);
      el = document.querySelector("#watch-menu");
      el.parentNode.insertBefore(insText, el);

    } else {
      console.log(logPrefix + 'This page is up-to-date!!');
    }
  }
}
const url = document.URL
	.replace(/#.*/, '')
	.replace(/$.*/, '');
console.log(logPrefix + url);

if (/developer\.mozilla\.org\/en-US\//.test(url) == false) {
  xhr.open("GET", url + '$json');
  xhr.send(null);
}

console.log (logPrefix + 'end');
