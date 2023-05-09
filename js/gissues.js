{
  function deparam(query) {
    var match;
    var plus = /\+/g;
    var search = /([^&=]+)=?([^&]*)/g;

    var decode = function decode(s) {
      return decodeURIComponent(s.replace(plus, ' '));
    };
    var params = {};
    while (match = search.exec(query)) {
      params[decode(match[1])] = decode(match[2]);
    }
    return params;
  }

  function param(obj) {
    var parts = [];
    for (var name in obj) {
      if (obj.hasOwnProperty(name) && obj[name]) {
        parts.push(encodeURIComponent(name) + "=" + encodeURIComponent(obj[name]));
      }
    }
    return parts.join('&');
  }

  let script = document.currentScript;
  let attrs = {};

  for (let i = 0; i < script.attributes.length; i++) {
    let attribute = script.attributes.item(i);
    attrs[attribute.name.replace(/^data-/, '')] = attribute.value;
  }

  let canonicalLink = document.querySelector("link[rel='canonical']");
  attrs.url = canonicalLink ? canonicalLink.href : location.origin + location.pathname + location.search;
  attrs.origin = location.origin;
  attrs.pathname = location.pathname.length < 2 ? 'index' : location.pathname.substr(1).replace(/\.\w+$/, '');
  attrs.title = document.title;
  let descriptionMeta = document.querySelector("meta[name='description']");
  attrs.description = descriptionMeta ? descriptionMeta.content : '';
  let ogtitleMeta = document.querySelector("meta[property='og:title'],meta[name='og:title']");
  attrs['og:title'] = ogtitleMeta ? ogtitleMeta.content : '';
  document.head.insertAdjacentHTML('afterbegin', "<style>.Gissues{position:relative;box-sizing:border-box;width:100%;margin-left:auto;margin-right:auto;}.Gissues-frame{position:absolute;left:0;right:0;width:1px;min-width:100%;max-width:100%;height:100%;border:0;}</style>");
  let Origin = "https://gissues.gitee.io";
  let url = Origin + "/Gissues.html";
  script.insertAdjacentHTML('afterend', "<div class='Gissues'><iframe class='Gissues-frame' title='Comments' scrolling='no' src='" + url + "?" + (0, param)(attrs) + "'></iframe></div>");
  let container = script.nextElementSibling;
  script.parentElement.removeChild(script);
  addEventListener('message', function (event) {
    if (event.origin !== Origin) {
      return;
    }

    let data = event.data;

    if (data && data.type === 'resize' && data.height) {
      container.style.height = data.height + "px";
    }
  });
}
