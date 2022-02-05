/**
 * Returns an HTMLElement list item template.
 * 
 * @param {Object} props - The properties inside the list item
 * @param {Array<string>} [props.classNames] - Array of CSS class names for li tag
 * @param {string} [props.innerElementTag] - HTML element type inside the list item (a, button, span, etc.)
 * @param {string} [props.innerElementText] - Text inside the inner element
 * @param {Object} [props.innnerElementAttributes] - Object of key-value attribute pairs ({ 'data-uuid': '1234', 'data-type': 'tag' })
 * @param {Array<string>} [props.innnerElementClassNames] - Array of CSS class names for inner element
 */
const listItem = ({ classNames = [], innerElementHtmlTag = 'button', innerElementText = '', innerElementAttributes = [], innerElementClassNames = [] }) => {
  const li = document.createElement('li');
  const innerElement = document.createElement(innerElementHtmlTag);

  // { 'data-uuid': '1234'} becomes data-uuid="1234"
  // { href: 'https://www.warnerbros.com' } becomes href="https://www.warnerbros.com"
  for (const [key, value] of Object.entries(innerElementAttributes)) {
    innerElement.setAttribute(key, value);
  };

  li.classList.add(...classNames);
  innerElement.classList.add(...innerElementClassNames);
  innerElement.innerText = innerElementText;

  li.appendChild(innerElement);

  return li;
}

export default listItem;
