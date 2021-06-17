import * as $ from "jquery";
import Post from "./Post";
import "./styles/styles.scss";

const post = new Post("Webpack Post Title");

console.log("Post tot String", post.toString());


//проверка работы jquery
function blink(selector) {
  $(selector).fadeOut(600, function () {
    $(this).fadeIn(600, function () {
      blink(this);
    });
  });
}

$(document).ready(function () {
  blink(".title");
});
