window.addEventListener('DOMContentLoaded', () => {
  // FOURTH ATTEMPT
  const firstTarget = document.getElementsByClassName('.firstTarget');
  console.log(firstTarget);
  document.addEventListener('click', function () {
    console.log(firstTarget);
  });
});



// THIRD ATTEMPT
// function display(){
//   const targets = document.getElementById('toggle');
//   if (targets.style.display === 'none') {
//     targets.style.display = 'block';
//   } else {
//     targets.style.display = 'none';
//   }
// }

// FIRST ATTEMPT
// const firstTarget = ('.firstTarget');
//
// function targetGone(aEvent) {
//   aEvent.target.firstTarget(display = none);
// }
// console.log('target');

// SECOND ATTEMPT
// document.getElementById('.targets');
// firstTarget.addEventListener('.click', function(() {
//   display = none;
// });
