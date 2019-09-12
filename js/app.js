'use strict';

let pictures = [];

function Pictures(picture) {
  this.image_url = picture.image_url;
  this.title = picture.title;
  this.description = picture.description;
  this.keyword = picture.keyword;
  this.horns = picture.horns;
  pictures.push(this);
}

let data1 = '/data/page-1.json';
let data2 = '/data/page-2.json';

$.get(data1, data => {
  data.forEach(picture => {
    var images = new Pictures(picture);
    images.render();
  })
  buildFilter();
})

$('#page1').on('click', function() {
  $('section').toggle();
  $.get(data1, data => {
    pictures = [];
    filterKeywords = [];
    $('section').remove();
    $('#default').siblings().remove();
    data.forEach(picture => {
      var images = new Pictures(picture);
      images.render();
    })
    console.log(pictures);
    buildFilter();
  })
})

$('#page2').on('click', function() {
  $('section').toggle();
  $.get(data2, data => {
    pictures = [];
    filterKeywords = [];
    $('section').remove();
    $('#default').siblings().remove();
    data.forEach(picture => {
      var images = new Pictures(picture);
      images.render();
    })
    console.log(pictures);
    buildFilter();
  })
})

Pictures.prototype.render = function() {
  const myTemplate = $('#photo-template').html();
  const $newSection = $('<section></section>');
  $newSection.html(myTemplate);

  // let templateRender = Handlebars.compile(myTemplate);
  // return templateRender(this);
  $newSection.find('h2').text(this.title);
  $newSection.find('img').attr('src', this.image_url);
  $newSection.find('img').attr('alt', this.description);
  $newSection.find('p').text(this.description);

  $newSection.attr('class', this.keyword);
  $('main').append($newSection);
}

let filterKeywords = [];

const buildFilter = () => {
  pictures.forEach(picture => {
    if (!filterKeywords.includes(picture.keyword)) {
      filterKeywords.push(picture.keyword);
    }
  })

  filterKeywords.forEach(keyword => {
    let optionTag = `<option value="${keyword}">${keyword}</option>`;
    $('select').append(optionTag);
  })
}

const handleFilter = () => {
  $('select').on('change', function() {
    let selected = $(this).val();
    if (selected !== 'default') {
      $('section').hide();
      $(`section.${selected}`).fadeIn();
    }
  })
}

handleFilter();
