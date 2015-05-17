/*
var albums = {
    home: '72157608376528102',
    abstract: '72157624708853721',
    paysages: '72157622949851126',
    portraits: '72157605117901038',
    default: '',
}
*/

document.write('<script type="text/javascript" src="js/jquery.flickr.js"></scr'+'ipt>');
// lightbox
document.write('<script type="text/javascript" src="js/jquery.fancybox.pack.js"></scr'+'ipt>');
document.write('<link rel="stylesheet" href="css/jquery.fancybox.css"></link>');

function flickIt(jQuerySelector, displayType, photosetId, opt_cbk){
    jQuerySelector.html('loading...');
    jQuerySelector.flickr({
        api_key: "7b5f9448ae4547ff02d6ce3db22e482d",
        type: 'photoset',
        photoset_id: photosetId,
        size: 'o',
        thumb_size: 'n',
        displayType: displayType,
        callback: function(){
            // lightbox
            if (displayType === 'fancybox'){
              $('a').fancybox();
            }
            // callback
            if (opt_cbk){
                opt_cbk(jQuerySelector);
            }
        },
        error: function(e){
            jQuerySelector.html('Error loading flickr gallery. ' + e);
        }
    });
}

function slideIt(jQuerySelector){
    $(jQuerySelector).find('ul > li:gt(0)').css('opacity', '0');
    setInterval(function() {
      $(jQuerySelector).find('ul > li:first')
        .fadeOut(1000)
        .next()
        .css('opacity', '1')
        .fadeIn(1000)
        .end()
        .appendTo($(jQuerySelector).find('ul'));
    },  10000);
}
function getPhotosetId(pageName){
    return pageName;
    //return albums[pageName] || albums['default'];
}
function onPageChange(newUrl){
    var currentPage = newUrl.substr(newUrl.indexOf('#!page-') + 7);
    window.jQuerySelector = $(".gallery");
    flickIt(jQuerySelector, 'fancybox', getPhotosetId(currentPage));
}
$(function(){
    window.jQuerySelector = $(".flickr .silex-element-content");
    //flickIt(jQuerySelector, 'slideshow', albums.home, slideIt);
    var currentPage = $('body').pageable().data().silexlabsPageable.options.currentPage
    currentPage = currentPage.substr(currentPage.indexOf('page-') + 5);
    flickIt(jQuerySelector, 'slideshow', currentPage, slideIt);
    onPageChange(window.location.href);
})
$(window).bind( 'hashchange', function (e){
    onPageChange(window.location.href);
});
