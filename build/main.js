var addSnippetForm = document.querySelector(".Add-Snippet-Form");
var arrowButton = document.querySelector(".Arrow");
var addSnippetButton = document.querySelector(".Showcase-Add-Snippet-Button");
var codeSnippets = document.querySelector(".Code-Snippets");
var showcaseDetails = document.querySelector(".Showcase-Details");
var codeSnippetView = document.querySelector(".Code-Snippet-View");
var themes = document.querySelectorAll(".Theme");

themes[0].disabled = true;
themes[1].disabled = false;

if (localStorage.getItem("general") == null) {
    localStorage.setItem("general", JSON.stringify({"total snippets": 0}));
    console.log("Created the 'general' key-value pair.");
    var showcaseDetail = `<p class="Showcase-Detail">Total Snippets - <span>${JSON.parse(localStorage.getItem("general"))["total snippets"]}</span></p>`;
    showcaseDetails.insertAdjacentHTML("afterbegin", showcaseDetail);
} else {
    var showcaseDetail = `<p class="Showcase-Detail">Total Snippets - <span>${JSON.parse(localStorage.getItem("general"))["total snippets"]}</span></p>`;
    showcaseDetails.insertAdjacentHTML("afterbegin", showcaseDetail);
}

if (localStorage.getItem("code snippets") == null) {
    localStorage.setItem("code snippets", JSON.stringify({}));
    console.log("Created the 'code snippets' key-value pair");
} else {
    var snippets = JSON.parse(localStorage.getItem("code snippets"));

    for (var snippet in snippets) {
        var codeSnippetHTML = `<div class="Snippet"><div class="Title-Space"><p class="Title">${snippets[snippet]["title"]}</p></div><div class="Snippet-Details"><p class="Snippet-Detail">Language -> <span>${snippets[snippet]["language"]}</span></p><p class="Snippet-Detail">Description<br><span>${snippets[snippet]["description"]}</span></p></div><div class="Circles"><div></div><div></div><div></div></div></div>`;
        codeSnippets.insertAdjacentHTML("beforeend", codeSnippetHTML);
    }
}

arrowButton.addEventListener("click", function () {
    addSnippetForm.classList.toggle("Hide");
    arrowButton.classList.toggle("Turn");
});

addSnippetButton.addEventListener("click", function (event) {
    event.preventDefault();
    var snippetTitle = document.querySelector(".Snippet-Title");
    var snippetLanguage = document.querySelector(".Snippet-Language");
    var snippetDescription = document.querySelector(".Snippet-Description");
    var snippetCode = document.querySelector(".Snippet-Code");

    if (snippetTitle != "" && snippetLanguage != "" && snippetDescription != "" && snippetCode != "") {
        var newSnippetHTMl = `<div class="Snippet"><div class="Title-Space"><p class="Title">${snippetTitle.value}</p></div><div class="Snippet-Details"><p class="Snippet-Detail">Language -> <span>${snippetLanguage.value}</span></p><p class="Snippet-Detail">Description<br><span>${snippetDescription.value}</span></p></div><div class="Circles"><div></div><div></div><div></div></div></div>`;
        codeSnippets.insertAdjacentHTML("beforeend", newSnippetHTMl);
        var codeSnippetsStorage = JSON.parse(localStorage.getItem("code snippets"));
        var newObject = {
            "title": snippetTitle.value,
            "language": snippetLanguage.value,
            "description": snippetDescription.value,
            "code": snippetCode.value
        }
        codeSnippetsStorage[`${snippetTitle.value} [${snippetLanguage.value}]`] = newObject;
        localStorage.setItem("code snippets", JSON.stringify(codeSnippetsStorage));
        var numberOfSnippets = JSON.parse(localStorage.getItem("general"))["total snippets"];
        console.log(numberOfSnippets);
        localStorage.setItem("general", JSON.stringify({"total snippets": numberOfSnippets + 1}));
        showcaseDetails.innerHTML = "";
        var showcaseDetail = `<p class="Showcase-Detail">Total Snippets - <span>${JSON.parse(localStorage.getItem("general"))["total snippets"]}</span></p>`;
        showcaseDetails.insertAdjacentHTML("afterbegin", showcaseDetail);
        snippetTitle.value = "";
        snippetLanguage.value = "";
        snippetDescription.value = "";
        snippetCode.value = "";
        codeSnippets.innerHTML = codeSnippets.innerHTML;
        var snippets = document.querySelectorAll(".Snippet");

        for (var i = 0 ; i < snippets.length ; i++) {
            snippets[i].addEventListener("click", function () {
                codeSnippetView.classList.toggle("Close-Snippet");    
            });
        }
    }
});

var snippets = document.querySelectorAll(".Snippet");

for (var i = 0 ; i < snippets.length ; i++) {
    snippets[i].addEventListener("click", function () {
        codeSnippetView.classList.toggle("Close-Snippet");    
        var snippets = JSON.parse(localStorage.getItem("code snippets"));

        for (var snippet in snippets) {
            console.log(snippets[snippet]["title"]);
            if (snippets[snippet]["title"] == this.children[0].children[0].textContent) {
                console.log(snippets[snippet]["title"]);
                var HTML = `<div class="Snippet-Details-View"><div id="Buttons"><button id="Change-Theme-Button">Change Theme</button><button id="Close-Snippet-Button">Close</button></div><p>Title - <span>${snippets[snippet]["title"]}</span></p><p>Language - <span>${snippets[snippet]["language"]}</span></p><p id="Code-Snippet-View-Description">Description - <span>${snippets[snippet]["description"]}</span></p></div><div class="Code-Snippet-View-Code"><pre><code>${snippets[snippet]["code"]}</code></pre></div>`;
                codeSnippetView.innerHTML = HTML;
                
                document.querySelector("#Change-Theme-Button").addEventListener("click", function() {
                    if (themes[0].disabled) {
                        themes[0].disabled = false;
                        themes[1].disabled = true;    
                        console.log(0);
                    } else if (themes[1].disabled) {
                        themes[0].disabled = true;
                        themes[1].disabled = false;
                        console.log(1);
                    }
                });
                
                var closeSnippetButton = document.querySelector("#Close-Snippet-Button");

                closeSnippetButton.addEventListener("click", function () {
                    codeSnippetView.classList.toggle("Close-Snippet");
                });

                document.querySelectorAll("pre code").forEach((block) => {
                    hljs.highlightBlock(block);
                });

                break;
            }
        }
    });
}
