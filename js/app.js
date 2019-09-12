'use strict';

const pictures = [];

function Pictures(picture) {
  this.image_url = picture.image_url;
  this.title = picture.title;
  this.description = picture.description;
  this.keyword = picture.keyword;
  this.horns = picture.horns;
  pictures.push(this);
}

$.get('/data/page-1.json', data => {
  data.forEach(picture => {
    var images = new Pictures(picture);
    images.render();
  })
})

console.log(pictures);

Pictures.prototype.render = function() {
  const option = $('select').html();
  const $newOption = $('<option></option>');
  $newOption.html(option);
  $newOption.text(this.keyword);
  // $newOption.find('option').text(this.keyword);
  $('select').append($newOption);

  const myTemplate = $('#photo-template').html();
  const $newSection = $('<section></section>');
  $newSection.html(myTemplate);

  $newSection.attr('value', this.keyword);
  $newSection.find('h2').text(this.title);
  $newSection.find('img').attr('src', this.image_url);
  $newSection.find('img').attr('alt', this.description);
  $newSection.find('p').text(this.description);
  $('main').append($newSection);

}


$('select').change(function(event) {
  pictures.forEach(images => {
    if (event.target.value !== images.keyword) {
      $([`value="${images.keyword}"`]).hide(500);
      console.log(images.keyword);
    }
  })
  //   console.log(event.target.value);
})





// $('select').change(function() {
//   pictures.forEach(images => {

//   })
// })
