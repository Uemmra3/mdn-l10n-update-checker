const logPrefix = 'mdn-l10n-update-checker: '
console.log (logPrefix + 'start');

<<<<<<< HEAD
const xhr = new XMLHttpRequest();
console.log ('start');
=======
let json;
let xhr = new XMLHttpRequest();
>>>>>>> 4be18168cc343504355c527dd3d6121364f1b63e
xhr.onreadystatechange = function() {
  if (xhr.readyState == 4 && xhr.status == 200) {
    //
    const json = JSON.parse(xhr.responseText);
    //console.log(json.title);
    //console.log(json.translations[0].url);

    // calculate how older
    const org_date = new Date(json.translations[0].last_edit);
    const l10n_date = new Date(json.last_edit);
    console.log(logPrefix + org_date);
    console.log(logPrefix + l10n_date);
    const timediff = org_date.getTime() - l10n_date.getTime();
    if (timediff > 0) {
      // convert to days
      const datediff = Math.floor(timediff/(24*3600000));
      console.log(logPrefix + 'This page is ' + datediff + ' days older!!');
      // Highlight edit UI
      //var el = document.querySelector(".page-buttons-edit");
      let el = document.querySelector(".document-actions");
      el.style.backgroundColor = 'orange';

      // Add datediff text
      const insText = datediff > 30 ?
        document.createTextNode('(' + Math.floor(datediff / 30) + ' months older) ') :
        document.createTextNode('(' + datediff + ' days older) ');
      el = document.querySelector("#watch-menu");
      if (el) {
	// when logged in
        el.parentNode.insertBefore(insText, el);
      } else {
	// when logged out on PC
        el = document.querySelector("#edit-button");
        if (!el) {
	  // when logged out on mobile
          el = document.querySelector("#languages-menu");
        }
        if (el) el.parentNode.insertBefore(insText, el.nextSibling);
      }

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
