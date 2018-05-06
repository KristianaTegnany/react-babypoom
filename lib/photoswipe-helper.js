


export const CACHE = {};

export const PSWP_OPTIONS = {
  history: false,
  shareButtons: [
    { id: 'facebook', label: 'Share on Facebook', url: 'https://www.facebook.com/sharer/sharer.php?u={{url}}' },
    { id: 'twitter', label: 'Tweet', url: 'https://twitter.com/intent/tweet?text={{text}}&url={{url}}' },
    { id: 'pinterest', label: 'Pin it', url: 'http://www.pinterest.com/pin/create/button/?url={{url}}&media={{image_url}}&description={{text}}' },
    { id: 'download', label: 'Download image', url: '{{raw_image_url}}', download: true }
  ]
};

export function gettingData(gallery, index, item) {
  if (!item.w || !item.h) { // unknown size
    if (CACHE[item.src]) return;
    CACHE[item.src] = {};

    let img = new Image();
    img.onload = function() {
      CACHE[item.src] = { width: this.width, height: this.height };
      item.w = this.width; // set image width
      item.h = this.height; // set image height
      gallery.invalidateCurrItems(); // reinit Items
      gallery.updateSize(true); // reinit Items
    };
    img.src = item.src; // let's download image
  }
}