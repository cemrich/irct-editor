(function () {
  var importDoc = document.currentScript.ownerDocument; // importee

  // Define and register
  var proto = Object.create(HTMLElement.prototype);

  proto.createdCallback = function () {
    // get template in import
    var template = importDoc.querySelector('template');

    // import template and add to DOM
    var node = document.importNode(template.content, true);
    var root = this.createShadowRoot();
    root.appendChild(node);

    // observe text changes
    var observer = new MutationObserver(this.onDomChange.bind(this));
    observer.observe(this, {childList: true, characterData: true, subtree: true});
    // TODO: cleanup when component is not longer in use

    // cache nodes
    this.delayNode = root.querySelector('.delay');
    this.characterNode = root.querySelector('.character');
    this.contentNode = root.querySelector('.content');

    // add attributes to template
    this.readAttributes();
    this.update();
  };

  proto.onDomChange = function (mutations) {
    this.readAttributes();
    this.update();
  };

  proto.attributeChangedCallback = function (attrName, oldVal, newVal) {
    if (/^(delay|character)$/.test(attrName)) {
      this.readAttributes();
      this.update();
    }
  };

  proto.readAttributes = function () {
    this.delay = this.getAttribute('delay') || 0;
    this.name = this.getAttribute('character') || '?';
    this.content = this.textContent.replace(/^(\/\w*)/, '<span class="action">$1</span>');;
    this.marginTop = this.delay / 1000;
  };

  proto.update = function () {
    this.delayNode.innerText = this.delay;
    this.characterNode.innerText = this.name;
    this.contentNode.innerHTML = this.content;
    this.contentNode.style.marginTop = this.marginTop + 'em';
  };

  document.registerElement('irct-entry', {prototype: proto});
})();
