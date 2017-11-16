/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
$( function () {
  function escape(str) {
    var div = document.createElement('div');
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  }

  function createTweetElement(tweet) {
    // ...
    var tweetArticle = `<article class="tweet">
                          <header class="headerbox">
                            <div class="userInfo">
                              <img class="avatar" src=${escape(tweet.user.avatars.large)} alt="User Avatar">
                              <h1 class="username">${escape(tweet.user.name)}</h1>
                            </div>
                            <h2 class="userhandle">${escape(tweet.user.handle)}</h2>
                          </header>
                          <div class="text">
                            ${escape(tweet.content.text)}
                          </div>
                          <footer class="footerbox">
                            <div>${escape(tweet.created_at)}</div>
                            <div class="icons">
                              <i class="fa fa-flag" aria-hidden="true"></i>
                              <i class="fa fa-retweet" aria-hidden="true"></i>
                              <i class="fa fa-heart" aria-hidden="true"></i>
                            </div>
                          </footer>
                        </article>`
    return tweetArticle;
  }

  function renderTweet(tweetData) {
    var $eachTweet;
    for (var tweet of tweetData) {
      $eachTweet = createTweetElement(tweet);
      $("#all-tweet-data").prepend($eachTweet);
    }
    // $("#all-tweet-data").append($eachTweet);
  }
    // renderTweet(tweetData);

  function loadTweet() {
    $.ajax({
      method: "GET",
      url: "/tweets",
      success: function(data) {
        console.log("Success: ", data);
        renderTweet(data);
      }
    });
  };
  loadTweet();

  function isValid(formData) {
    if(!formData) { 
      alert('Must put something');
      return false;
    } else if (formData.length > 140) {
      alert('too long...')
      return false;
    } else {
      return true;
    }
    // if(formData && formData.length > 0 && formData.length <= 140) {
    //   return true
    // }
  }

  $("form").submit(function(event) {
    event.preventDefault();

    var $tweet = $(this).find('textarea').val();

    if (!isValid($tweet)) { 
      return;
    } 
    
    var formData = $(this).serialize();

    $.post('/tweets', formData)
      .success(loadTweet)
  })

  $(".new-tweet").hide();
    $("#compose-button").click(function(event) {
      $(".new-tweet").slideToggle();
      $("textarea").focus();
    })
})
// var $tweet = createTweetElement(tweetData);

// // Test / driver code (temporary)
// console.log($tweet); // to see what it looks like
// $('#all-tweet-data').append($tweet); // to add it to the 
// // page so we can make sure it's got all the right elements, classes, etc.
