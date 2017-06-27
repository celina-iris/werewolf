var users, posts;
var numPosts = 99, endPosts = 89;

src="http://viralpatel.net/blogs/demo/jquery/jquery.shorten.1.0.js"

$(document).ready(function(){
    
    $.get("https://jsonplaceholder.typicode.com/users", function(data) {
        users = data;
    });
    
    $.get("https://jsonplaceholder.typicode.com/posts", function(data) {
		posts = data;
        display();
	});
});

function display(){
    displayFriends();
    displayPosts();
}

function displayFriends(){
    var friends = document.createElement("div"); //this means that friends is a div
    $(friends).addClass("list");
    
    var nameList = document.createElement("span"); //this means that nameList is a span
    $(nameList).addClass("sidebar_span"); //this means that nameList has the css design of sidebar_span
    $(nameList).text("FRIENDS");
        
    $(friends).append(nameList); //nameList is attach to friends div
    $(friends).append("<br/> ");
    $(".sidebar").append(friends); //friends is attach to sidebar
        
    for (var i = 0; i < users.length; i++){
        var name = document.createElement("a");
        $(name).addClass("sidebar_p");
        $(name).text(users[i].username);
        
/*NEEDS LINKING TO SPECIFIC PROFILE*/
        $(name).prop("href", "Profile-feed.html?user="+users[i].id);

        $(friends).append(name);
        $(friends).append("<br/> <br/>");
        $(".sidebar").append(friends);
    }
    $(".list").hide().fadeIn(800);
}

function displayPosts(){
    if(numPosts > endPosts) {
        $(".feed").empty();
        for (var i = 99; i > numPosts - 10 && i >= endPosts; i--){
            
            console.log(posts[i].id);
            
            var container = document.createElement("div");
            $(container).addClass("post_container");

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
            $(container).append(display_picture);
            $(container).append(title);
            $(container).append(text);
            $(".feed").append(container);  
        }
        
        snippet();
        $(".post_container").hide().fadeIn(800);
        numPosts = i;
        endPosts -= 10;
        
        var buttonNext = document.createElement("div");
        $(buttonNext).attr("id", "btnNext");
        $(buttonNext).text("Load More");
        $(buttonNext).click(function(){
            onNextClicked();
        });
        $(".feed").append(buttonNext);  
        $("#btnNext").hide().fadeIn(800);
    }
}

function snippet(){
    var showChar = 100;
    var ellipsestext = "...";
    var moretext = "more";
    var lesstext = "less";
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

function showButton(){
    $("#btnNext").hide().fadeIn(800);
}

function onNextClicked(){
    displayPosts();
    hideNextButton();
}

function hideNextButton(){
    if (endPosts == -11){
        $("#btnNext").addClass("hide-me");
    }
}
        


        
