/**
 * Returns an HTMLElement book template
 * 
 * @param {Object} book
 * @param {string} [book.title]
 * @param {string} [book.image]
 * @param {string} [book.description]
 * @param {number} [book.pages]
 * @param {string} [book.release_date]
 * @param {Array<string>} [book.authors]
 * @param {string} [book.issue_number]
 * @param {string} [book.age_rating]
 * @param {string} [book.series_title]
 */
const book = ({
    title = 'No Book Selected',
    image = 'http://via.placeholder.com/235x360',
    description = '',
    pages,
    release_date = '',
    authors,
    issue_number = '',
    age_rating = '',
    series_title = ''
  }) => {
  const div = document.createElement('div');
  div.classList.add('content');
  const markup = `
    <h3 class="subtitle">${title}</h3>
    <img src="${image}" alt="${title}" />
    ${description && '<p>' + description + '</p>' }
    <ul>
      <li><strong>Pages:</strong> <span>${isNaN(pages) ? '' : pages }</span></li>
      <li><strong>Release Date:</strong> <span>${release_date}</span></li>
      <li><strong>Authors:</strong> <span>${Array.isArray(authors) ? authors.join(', ') : ''}</span></li>
      <li><strong>Issue Number:</strong> <span>${issue_number}</span></li>
      <li><strong>Age Range:</strong> <span>${age_rating}</span></li>
      <li><strong>Series Title:</strong> <span>${series_title}</span></li>
    </ul>
  `;
  div.innerHTML = markup;
  return div;
};

export default book;
