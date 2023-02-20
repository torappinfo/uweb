{
  const svgns = "http://www.w3.org/2000/svg";
  const textAttributes = new Set([
    'color',
    'dominant-baseline',
    'font-family',
    'font-size',
    'font-size-adjust',
    'font-stretch',
    'font-style',
    'font-variant',
    'font-weight',
    'direction',
    'letter-spacing',
    'text-decoration',
    'text-anchor',
    'text-decoration',
    'text-rendering',
    'unicode-bidi',
    'word-spacing',
    'writing-mode',
    'user-select',
  ]);
  function copyTextStyles(styles, svgElement){
    for (const textProperty of textAttributes) {
      const value = styles.getPropertyValue(textProperty)
      if (value) {
	svgElement.setAttribute(textProperty, value)
      }
    }
    // tspan uses fill, CSS uses color
    svgElement.setAttribute('fill', styles.color)
  }
  function handleSVGElement(svg, element){
    const contentContainer = Document.createElementNS(svgns, 'g');
    contentContainer.innerHTML = element.innerHTML;
    contentContainer.dataset.viewBox = element.getAttribute('viewBox');
    contentContainer.dataset.width = element.getAttribute('width');
    contentContainer.dataset.height = element.getAttribute('height');
    let viewBoxTransformMatrix = element.getScreenCTM();
    contentContainer.transform.baseVal.appendItem( contentContainer.transform.baseVal.createSVGTransformFromMatrix(viewBoxTransformMatrix));
    svg.appendChild(contentContainer);
  }

  function createSVG(svg, node){
    let rect;
    if(Node.TEXT_NODE === node.nodeType) {
      let str = node.textContent;
      if(str.match(/^\s+$/)) return;
      rect = node.parentElement.getBoundingClientRect();
      const text = document.createElementNS(svgns, 'text');
      text.innerHTML = str;
      text.setAttribute("x", rect.left);
      text.setAttribute("y", rect.top);
      svg.appendChild(text);
      return;
    }
    if(Node.ELEMENT_NODE!=node.nodeType) return;
    let element = node;
    if("SCRIPT" == element.tagName ||
       "STYLE"  == element.tagName) return;
    rect = element.getBoundingClientRect();
    if("SVG" == element.tagName) {
      handleSVGElement(svg,element);
      /*
      let clone = element.cloneNode(true);
      clone.setAttribute("x", rect.left);
      clone.setAttribute("y", rect.top);
      clone.setAttribute("width", rect.width);
      clone.setAttribute("height", rect.height);
      svg.appendChild(clone);
      */
      return;
    }
    //const styles = window.getComputedStyle(element);
    let children = element.childNodes;
    let nChildren = children.length;

    // Get the HTML element's style
    //var style = window.getComputedStyle(element);
    //svg.setAttribute("style", style);
    
    // Iterate through the HTML element's children
    for (let i = 0; i < nChildren; i++) {
      createSVG(svg, children[i]);
    }
  }
  // Get the HTML element to be converted
  let element = document.body;
  // Append the SVG element to the HTML document
  let svg = document.createElementNS(svgns,'svg');
  let rect = element.getBoundingClientRect();
//  svg.setAttribute("x", rect.left);
//  svg.setAttribute("y", rect.top);
  svg.setAttribute("width", rect.width);
  svg.setAttribute("height", rect.height);
  createSVG(svg, element);
  //document.body.appendChild(svg);
  
  // Create a Blob of the string
  let svgS = new XMLSerializer().serializeToString(svg);
  const blob = new Blob([svgS], { type: 'text/plain' });

  // Create a link element
  const link = document.createElement('a');
  // Create the url
  link.href = window.URL.createObjectURL(blob);

  // Set the file name
  link.download = 'uweb.svg';
  
  // Append the link to the DOM
  document.body.appendChild(link);

  // Click the link
  link.click();

  // Remove the link from the DOM
  document.body.removeChild(link);
}
                    
