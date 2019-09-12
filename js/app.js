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

Pictures.prototype.render = function() {
  const myTemplate = $('#photo-template').html();
  const $newSection = $('<section></section>');
  $newSection.html(myTemplate);

  // $newSection.attr('value', this.keyword);
  $newSection.find('h2').text(this.title);
  $newSection.find('img').attr('src', this.image_url);
  $newSection.find('img').attr('alt', this.description);
  $newSection.find('p').text(this.description);
  $newSection.attr('class', this.keyword);
  $('main').append($newSection);
}

const buildFilter = () => {
  const filterKeywords = [];
  pictures.forEach(picture => {
    if (!filterKeywords.includes(picture.keyword)) {
      filterKeywords.push(picture.keyword);
    }
  })

  filterKeywords.sort();

  filterKeywords.forEach(keyword => {
    let optionTag = `<option value="${keyword}">${keyword}</option>`;
    $('select').append(optionTag);
  })
  console.log(filterKeywords);
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

buildFilter();
handleFilter();
