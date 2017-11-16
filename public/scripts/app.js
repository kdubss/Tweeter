/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
$( function () {
  // var tweetData = [
  //   {
  //     "user": {
  //       "name": "Newton",
  //       "avatars": {
  //         "small":   "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_50.png",
  //         "regular": "https://vanillicon.com/788e533873e80d2002fa14e1412b4188.png",
  //         "large":   "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_200.png"
  //       },
  //       "handle": "@SirIsaac"
  //     },
  //     "content": {
  //       "text": "If I have seen further it is by standing on the shoulders of giants"
  //     },
  //     "created_at": 1461116232227
  //   },
  //   {
  //     "user": {
  //       "name": "Descartes",
  //       "avatars": {
  //         "small":   "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc_50.png",
  //         "regular": "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc.png",
  //         "large":   "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc_200.png"
  //       },
  //       "handle": "@rd" },
  //     "content": {
  //       "text": "Je pense , donc je suis"
  //     },
  //     "created_at": 1461113959088
  //   },
  //   {
  //     "user": {
  //       "name": "Johann von Goethe",
  //       "avatars": {
  //         "small":   "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1_50.png",
  //         "regular": "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1.png",
  //         "large":   "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1_200.png"
  //       },
  //       "handle": "@johann49"
  //     },
  //     "content": {
  //       "text": "Es ist nichts schrecklicher als eine tätige Unwissenheit."
  //     },
  //     "created_at": 1461113796368
  //   }
  // ];

  function escape(str) {
    var div = document.createElement('div');
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  }

  function createTweetElement(tweet) {
    // ...
    var tweetArticle = `<article class = "tweetPlz">
                          <header class="headerbox">
                            <img src = ${escape(tweet.user.avatars.large)} height="42" width="42">
                              <h1>${escape(tweet.user.name)}</h1>
                              <h2>${escape(tweet.user.handle)}</h2>
                          </header>
                            <p class="text">
                              ${escape(tweet.content.text)}
                            </p>
                            <footer>
                              <p>${escape(tweet.created_at)}</p>
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
      $("#all-tweet-data").append($eachTweet);
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
    if (formData.length === "" || formData.length === null) {
      return false;
    } else if (formData.length === 140) {
      alert("Your tweet can not be longer than 140 characters!");
      return false;
    } else {
      return true;
    }
  }

  $("form").submit(function(event) {
    event.preventDefault();
    var formData = $(this).serialize();

    if (!isValid(formData)) return;

    $.post('/tweets', formData)
      .success(loadTweet)
      .error(err => alert(err));

  });

});
// var $tweet = createTweetElement(tweetData);

// // Test / driver code (temporary)
// console.log($tweet); // to see what it looks like
// $('#all-tweet-data').append($tweet); // to add it to the 
// // page so we can make sure it's got all the right elements, classes, etc.
