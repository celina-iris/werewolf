var albums, users, photos;
var numPic = 4999, end = 0, cur = 0;
$(document).ready(function () {
    
    $.get("https://jsonplaceholder.typicode.com/albums", function (data) {
		albums = data;
	});
	
	$.get("https://jsonplaceholder.typicode.com/users", function (data) {
		users = data;
	});
    
    $.get("https://jsonplaceholder.typicode.com/photos", function (data) {
        photos = data;
        setHeader();
        var url = new URL(window.location.href);
        var userNum = parseInt(url.searchParams.get("user"));
        if(!isNaN(userNum)) {
            getStartU(userNum);
            getEndU(userNum);
        } else {
            getStartA();
            getEndA();
        }
        displayPictures();
    });
    
});

function setHeader() {
    var head = document.createElement("section");
    $(head).attr("style", "color: #fff;");
    var navi = document.createElement("nav");
    $(navi).addClass("fill");
    var pl = document.createElement("ul");
    
    var l1 = document.createElement("li");
    var l2 = document.createElement("li");
    var l3 = document.createElement("li");
    
    var url = new URL(window.location.href);
    var userNum = parseInt(url.searchParams.get("user"));
    
    var on = document.createElement("a");
    $(on).attr("href", "index.html");
    $(on).text("Home");
    if(!isNaN(userNum)) {
        var tw = document.createElement("a");
        $(tw).attr("href", "Profile-feed.html?user=" + userNum);
        $(tw).text("Profile");
    }
    var th = document.createElement("a");
    $(th).attr("href", url);
    $(th).text("Pictures");
    
    $(l1).append(on);
    $(l3).append(th);
    
    $(pl).append(l1);
    if(!isNaN(userNum)) {
        $(l2).append(tw);
        $(pl).append(l2);
    }
    
    $(pl).append(l3);
    
    $(navi).append(pl);
    
    $(head).append(navi);
    
    $(".place").append(head);
}

function getStartU(userNum) {
    var found = false;
    while(numPic > 0 && !found) {
        if(userNum == parseInt(users[parseInt(albums[parseInt(photos[numPic].albumId)-1].userId) - 1].id)) {
            found = true;
        } else {
            --numPic; 
        }
    }
    $(".nameAlbum").append("<h2>Photos of " + users[userNum-1].username+ "</h2>");
}

function getEndU(userNum) {
    var found = false;
    if(!isNaN(userNum)) {
        end = numPic;
        while(end > 0 && !found) {
            if(userNum != parseInt(users[parseInt(albums[parseInt(photos[numPic].albumId)-1].userId) - 1].id)) {
                found = true;
            } else {
                --end; 
            }
        }
    }
}

function getStartA() {
    var found = false;
    var url = new URL(window.location.href);
    var albumNum = parseInt(url.searchParams.get("album"));
    if(!isNaN(albumNum)) {
        while(numPic > end && !found) {
            if(albumNum == parseInt(photos[numPic].albumId)) {
                found = true;
            } else {
                --numPic; 
            }
        }
        $(".nameAlbum").append("<h2>" + albums[parseInt(photos[numPic].albumId)-1].title + "</h2>");
    } else {
        $(".nameAlbum").append("<h2>All Photos</h2>");
    }
}

function getEndA() {
    var found = false;
    var url = new URL(window.location.href);
    var albumNum = parseInt(url.searchParams.get("album"));
    if(!isNaN(albumNum)) {
        end = numPic;
        while(end > 0 && !found) {
            if(albumNum != parseInt(photos[end].albumId)) {
                found = true;
            } else {
                --end; 
            }
        }
    }
}

function displayPictures() {
    //celina change this to "user" to get userid from link if userid=NaN no user; for album=NaN :: all photos
    if (numPic > end) {
        for(var count = numPic; count > numPic - 9 && count > end; --count) {
            //Album Part
            var col = document.createElement("div");
            $(col).addClass("column");
            var image = $("<img>");
            $(image).addClass("hover-shadow cursor");
            $(image).attr("style", "width:100%");
            $(image).attr("onclick", "openModal();currentSlide("+cur+")");
            image.attr("src", photos[count].thumbnailUrl);
            $(col).append(image);
            $(".row").append(col);
            
            //slideshow top
            var mSlide = document.createElement("div");
            $(mSlide).addClass("mySlides");
            var ntxt = document.createElement("div");
            $(ntxt).addClass("numbertext");
            var image = $("<img>");
            $(image).attr("style", "width:100%");
            image.attr("src", photos[count].url);
            ++cur;
            $(ntxt).append("<p>"+cur+"</p>");
            --cur;
            $(mSlide).append(ntxt);
            $(mSlide).append(image);
            $(".slide").append(mSlide);
            
            //slideshow bottom
            var c2 = document.createElement("div");
            $(c2).addClass("column2");
            var image = $("<img>");
            $(image).addClass("demo cursor");
            $(image).attr("style", "width:70%");
            $(image).attr("onclick", "currentSlide("+cur+")");
            image.attr("src", photos[count].thumbnailUrl);
            $(c2).append(image);
            $(".bottom").append(c2);
            ++cur;
            
            //captions
            var cap = document.createElement("div");
            $(cap).addClass("caption");
            $(cap).append("<p>Photo Title: "+ photos[count].title +"</p>");
            //update link for variable "passing"
            var clkabl = $("<a>");
            $(clkabl).addClass("clkabl_a");
            $(clkabl).attr("href", "InAlbum.html?album=" + photos[count].albumId);
            $(clkabl).text("From Album Title: " + albums[parseInt(photos[count].albumId)-1].title);
            var clkabl2 = $("<a>");
            $(clkabl2).addClass("clkabl_a");
            $(clkabl2).attr("href", "Profile-feed.html?user=" + users[parseInt(albums[parseInt(photos[count].albumId)-1].userId) - 1].id);
            $(clkabl2).text("Taken By: " + users[parseInt(albums[parseInt(photos[count].albumId)-1].userId) - 1].username);
            $(cap).append(clkabl);
            $(cap).append("<p></p>");
            $(cap).append(clkabl2);
            $(".caption-container").append(cap);
        }
        numPic = count;
    }
}



function openModal() {
    document.getElementById('myModal').style.display = "block";
    var btn = document.getElementById("btnNext");
    btn.style.display="none";
    hideCaptions();
}

function closeModal() {
    document.getElementById('myModal').style.display = "none";
    var btn = document.getElementById("btnNext");
    btn.style.display="block";
    hideCaptions();
}

var slideIndex = 0;

function plusSlides(n) {
    hideCaptions();
    showSlides(slideIndex += n);
}

function hideCaptions() {
    var captionText = document.getElementsByClassName("caption");
    for (i = 0; i < captionText.length; i++) {
        captionText[i].style.display = "none";
    }
}

function currentSlide(n) {
    hideCaptions();
    showSlides(slideIndex = n);
}

function showSlides(n) {
    var i;    
    var slides = document.getElementsByClassName("mySlides");
    var dots = document.getElementsByClassName("demo");
    var captionText = document.getElementsByClassName("caption");
    if (n >= slides.length) {
        slideIndex = 0
    }
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
    for (i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(" active", "");
    }
    slides[slideIndex].style.display = "block";
    dots[slideIndex].className += " active";
    captionText[slideIndex].style.display="block";
}