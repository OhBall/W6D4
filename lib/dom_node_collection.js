class DOMNodeCollection{
  constructor(HTMLElements){
    this.HTMLElements = HTMLElements;
    return this;
  }

  html(_string){
    if (_string !== undefined) {
      for (let i = 0; i < this.HTMLElements.length; i++) {
        this.HTMLElements[i].innerHTML = _string;
      }
    } else {
      return this.HTMLElements[0].innerHTML;
    }
  }

  empty() {
    this.html.call(this, "");
  }

  append(arg){
    for (var i = 0; i < this.HTMLElements.length; i++) {
      if (arg instanceof DOMNodeCollection) {
        for (var j = 0; j < arg.HTMLElements.length; j++) {
          this.HTMLElements[i].innerHTML += arg.HTMLElements[j].outerHTML;
        }
      } else if (arg instanceof String){
        this.HTMLElements[i].innerHTML += arg;
      } else {
        this.HTMLElements[i].innerHTML += arg.outerHTML;
      }
    }
  }

  attr(attrName, _value) {
    if (_value === undefined) {
      return this.HTMLElements[0].getAttribute(attrName);
    } else {
      for (var i = 0; i < this.HTMLElements.length; i++) {
        this.HTMLElements[i].setAttribute(attrName, _value);
      }
    }
  }

  addClass(className){
    for (var i = 0; i < this.HTMLElements.length; i++) {
      const oldClasses = this.HTMLElements[i].getAttribute("class");
      let newClasses;
      if (oldClasses === null) {
        newClasses = className;
      } else {
        newClasses = oldClasses + " " + className;
      }
      this.HTMLElements[i].setAttribute("class", newClasses);
    }
  }

  removeClass(_className) {
    for (var i = 0; i < this.HTMLElements.length; i++) {
      if (_className === undefined) {
        this.HTMLElements[i].removeAttribute('class');
      } else {
        let classString = this.HTMLElements[i].getAttribute('class');
        let oldClasses = classString.split(' ');
        let removeClasses = _className.split(' ');
        let newClasses = [];

        for (var j = 0; j < oldClasses.length; j++) {

          if (!removeClasses.includes(oldClasses[j])) {
            newClasses.push(oldClasses[j]);
          }
        }
        this.HTMLElements[i].setAttribute('class', newClasses.join(' '));
      }
    }
  }

  children(_selector) {
    let child = [];
    for (var i = 0; i < this.HTMLElements.length; i++) {
      if (_selector === undefined ) {
        child = child.concat(Array.from(this.HTMLElements[i].children));
      } else {
        let immediateChildren =  Array.from(this.HTMLElements[i].children);
        for (var j = 0; j < immediateChildren.length; j++) {
          if (immediateChildren[j].matches(_selector)) {
            child.push(immediateChildren[j]);
          }
        }

      }
    }
    return new DOMNodeCollection(child);
  }

  parent(_selector) {
    let parents = [];
    for (var i = 0; i < this.HTMLElements.length; i++) {
      let htmlEl = this.HTMLElements[i];
      // debugger
      if (!parents.includes(htmlEl.parentNode)) {
        if (_selector === undefined || htmlEl.parentNode.matches(_selector)){
          parents.push(htmlEl.parentNode);
        }
      }
    }
    return new DOMNodeCollection(parents);
  }

  find(selector) {
    let found =[];

    for (var i = 0; i < this.HTMLElements.length; i++) {
      let htmlEl = this.HTMLElements[i];
      found = found.concat(Array.from(htmlEl.querySelectorAll(selector)));

    }
    return new DOMNodeCollection(found);
  }

  remove(_selector) {
    let i = 0;
    while (i < this.HTMLElements.length ) {
      let htmlEl = this.HTMLElements[i];
      if (_selector === undefined || htmlEl.matches(_selector)) {
        htmlEl.remove();
        this.HTMLElements.splice(i,1);
        i--;
      }
      i++;
    }
  }

  on(eventType, callback) {
    for (var i = 0; i < this.HTMLElements.length; i++) {
      let htmlEl = this.HTMLElements[i];
      htmlEl.addEventListener(eventType, callback);
      // const prevCallbacks = htmlEl.getAttribute('data-callbacks');
      // htmlEl.setAttribute('data-callbacks', `~~${callback}~~`);
      if (htmlEl.callbacks) {
        htmlEl.callbacks.push(callback);
      } else {
        htmlEl.callbacks = [callback];
      }
    }
  }

  off(eventType, callback) {
    for (var i = 0; i < this.HTMLElements.length; i++) {
      let htmlEl = this.HTMLElements[i];
      if (callback) {
        const cbIdx = htmlEl.callbacks.indexOf(callback);
        htmlEl.removeEventListener(eventType, htmlEl.callbacks[cbIdx]);
      } else {
        for (var j = 0; j < htmlEl.callbacks.length; j++) {
          htmlEl.removeEventListener(eventType, htmlEl.callbacks[j]);
          htmlEl.callbacks = [];
        }
      }
    }
  }

}
module.exports = DOMNodeCollection;
