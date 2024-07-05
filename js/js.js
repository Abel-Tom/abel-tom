// var coll = document.getElementsByClassName("collapsible");
// var i;

// for (i = 0; i < coll.length; i++) {
//   coll[i].addEventListener("click", function() {
//     this.classList.toggle("active");
//     var content = this.nextElementSibling;
//     if (content.style.display === "block") {
//       content.style.display = "none";
//     } else {
//       content.style.display = "block";
//     }
//   });
// }

var coll = document.getElementsByClassName("collapsible");
var i;

for (i = 0; i < coll.length; i++) {
  coll[i].addEventListener("click", function() {
    this.classList.toggle("active");
    // var content = this.nextElementSibling;
    
    var content = document.getElementsByClassName("content")[0];
    if (content.style.maxHeight){
      content.style.maxHeight = null;
      this.children[0].lastChild.textContent = "View More Projects"
      this.children[1].className = "arrow2 down"
    } else {
      content.style.maxHeight = content.scrollHeight + "px";
      this.children[0].lastChild.textContent = "View Less Projects"
      this.children[1].className = "arrow2 up"
    }
  });
}