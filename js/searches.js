var albums, users, photos, posts;
$(document).ready(function (){
    $.get("https://jsonplaceholder.typicode.com/users", function (data) {
        users = data;
    });
    $.get("https://jsonplaceholder.typicode.com/albums", function (data) {
        albums = data;
    });
    $.get("https://jsonplaceholder.typicode.com/photos", function (data) {
        photos = data;
    });
    $.get("https://jsonplaceholder.typicode.com/posts", function (data) {
        posts = data;
        setTimeout(function(){
            filter();
        }, 1000);
    });
});

function filter() {
    var url = new URL(window.location.href);
    var search = url.searchParams.get("search");
    if(search) {
        filterUsers(search);
        filterAlbums(search);
        filterPhotos(search);
        filterPosts(search);
    }
}

function displayPosts(posts){
    for (var i = 0; i < posts.length; ++i){

        var container = document.createElement("div");
        $(container).addClass("post_container");
        
        var title_P = document.createElement("div");
        $(title_P).addClass("t_span");
        $(title_P).text("POST");
        
        console.log("cdsv");
        var display_picture = document.createElement("div");
        $(display_picture).addClass("post_display_picture");

        /*user_name is attached to display_picture*/
        var user_name = document.createElement("a");
        $(user_name).addClass("post_user_name");

/*NEEDS LINKING TO SPECIFIC PROFILE*/
        $(user_name).attr("href", "Profile-feed.html?user=" + posts[i].userId);
        $(user_name).text(users[posts[i].userId - 1].username);

        var title = document.createElement("div");
        $(title).addClass("post_title");
        $(title).text(posts[i].title);

        var text = document.createElement("div");
        $(text).addClass("post_text");
        $(text).text(posts[i].body);

        $(display_picture).append(user_name);
        $(container).append(title_P);
        $(container).append(display_picture);
        $(container).append(title);
        $(container).append(text);
        $(".feed").append(container);  
    }

    snippet();
}

function snippet(){
    var showChar = 100;
    var ellipsestext = "...";
    var moretext = "less";
    var lesstext = "more";
    $('.post_text').each(function() {
        var content = $(this).html();

        if(content.length > showChar) {

            var c = content.substr(0, showChar);
            var h = content.substr(showChar-1, content.length - showChar);

            var html = c + '<span class="moreelipses">'+ellipsestext+'</span>&nbsp;<span class="morecontent"><span>' + h + '</span>&nbsp;&nbsp;<a href="" class="morelink">'+moretext+'</a></span>';

            $(this).html(html);
        }
    });

    $(".morelink").click(function(){
        if($(this).hasClass("less")) {
            $(this).removeClass("less");
            $(this).html(moretext);
        } else {
            $(this).addClass("less");
            $(this).html(lesstext);
        }
        $(this).parent().prev().toggle();
        $(this).prev().toggle();
        return false;
    });
}

function filterPosts(search) {
    var searchResult = [];
    var post;

    for(var i = posts.length-1 ; i >= 0 ; i--) {
        post = posts[i];

        if(post.title.toLowerCase().indexOf(search.toLowerCase()) != -1 || post.body.toLowerCase().indexOf(search.toLowerCase()) != -1) {
            console.log(i);
            searchResult.push(post);
        }
    }
    displayPosts(searchResult);

}

function displayPictures(searchResult) {
    //celina change this to "user" to get userid from link if userid=NaN no user; for album=NaN :: all photos
    var cur = 0;
    for(var count = 0; count < searchResult.length ; ++count) {
        //Album Part
        var col = document.createElement("div");
        $(col).addClass("column");
        var image = $("<img>");
        $(image).addClass("hover-shadow cursor");
        $(image).attr("style", "width:100%");
        $(image).attr("onclick", "openModal();currentSlide("+cur+")");
        image.attr("src", photos[count].thumbnailUrl);
        $(col).append(image);
        $(".feed").append(col);

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
        $(clkabl2).attr("href", "Profile-Feed.html?user=" + users[parseInt(albums[parseInt(photos[count].albumId)-1].userId) - 1].id);
        $(clkabl2).text("Taken By: " + users[parseInt(albums[parseInt(photos[count].albumId)-1].userId) - 1].username);
        $(cap).append(clkabl);
        $(cap).append("<p></p>");
        $(cap).append(clkabl2);
        $(".caption-container").append(cap);
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

function filterPhotos(search) {
    var searchResult = [];
    var photo;

    for(var i = photos.length-1 ; i >= 0 ; i--) {
        photo = photos[i];

        if(photo.title.toLowerCase().indexOf(search.toLowerCase()) != -1) {
    console.log(i);
            searchResult.push(photo);
        }
    }
    displayPictures(searchResult);
}

function displayAlbum(search){
    
    var pick = 0;
    for(var count = 0 ; count < search.length ; ++count) {
        
        var album_container = document.createElement("div"); //this means that friends is a div
        $(album_container).addClass("post_container");
        
        var title = document.createElement("div");
        $(title).addClass("t_span");
        $(title).text("ALBUM");
        
        var album = document.createElement("div");
        var image = $("<img>");
        $(image).attr("style", "width:30%");
        $(image).addClass("album_img");
        var t = document.createElement("a");
        $(t).attr("href", "InAlbum.html?album=" + albums[count].id);
        if(count == 0) {
            pick = randomizer()+(count)*49;
        } else {
            pick = randomizer()+(count-1)*49;
        }
        
        image.attr("src", photos[pick].thumbnailUrl);
        
        var clkabl = $("<a>");
        $(clkabl).addClass("album_p");
        $(clkabl).attr("href", "InAlbum.html?album=" + albums[count].id);
        $(clkabl).addClass("album_p");
        $(clkabl).text(albums[count].title);
        $(t).append(image);
        $(album).append(t);
        $(album).append(clkabl);
    
        $(album_container).append(title);
        $(album_container).append(album);
        $(".feed").append(album_container);
    }
}

function randomizer(){
    return Math.floor(Math.random()*49);
}

function filterAlbums(search) {
    var searchResult = [];
    var album;

    for(var i = albums.length -1 ; i >=0 ; --i) {
        album = albums[i];

        if(album.title.toLowerCase().indexOf(search.toLowerCase()) != -1) {
            console.log(i);
            searchResult.push(album);
        }
    }
    displayAlbum(searchResult);
}

function filterUsers(search) {
    var searchResult = [];
    var user;
    for(var i = users.length - 1 ; i >= 0 ; --i) {
        user = users[i];
        if(user.name.toLowerCase().indexOf(search.toLowerCase()) != -1 || user.username.toLowerCase().indexOf(search.toLowerCase()) != -1) {
            /*User Name*/
            var user_container = document.createElement("div");
            $(user_container).addClass("post_container");
            
            var title = document.createElement("div");
            $(title).addClass("t_span");
            $(title).text("USER");
            
            var username = document.createElement("a");
            $(username).text(user.username);
            ++i;
            $(username).addClass("userA");
            $(username).attr("href", "Profile-feed.html?user=" + i);
            --i;
            
            $(user_container).append(title); 
            $(user_container).append(username);  
            $(".feed").append(user_container);    
        }
    }
}