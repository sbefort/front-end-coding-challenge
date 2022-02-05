import listItemTemplate from './templates/listItem.js';
import bookTemplate from './templates/book.js';

export default class TagBrowserWidget {
  constructor(config) {
    this.config = config;

    this.state = {
      data: [],
      tags: [],
      selectedTag: '',
      selectedBookId: '',
    }

    this.getElements();
    this.bindEventListeners();
    this.fetchData();
  }

  async fetchData() {
    const response = await fetch('/js/data.json');
    const data = await response.json();
    this.setData(data);
  }

  setData(data) {
    // List of all tags in a flat array, alphabetized, not de-duped
    const tags = data.map((item) => item.tags).flat().sort();
  
    this.setState({
      data,
      tags: [...new Set(tags)], // De-dupe the tags with a set
    })
  }

  getElements() {
    this.tagList = this.config.element.querySelector('.tag-list');
    this.matchList = this.config.element.querySelector('.matching-items-list');
    this.selectedBook = this.config.element.querySelector('.selected-item');
    this.clearButton = this.config.element.querySelector('.clear-button');
  }

  bindEventListeners() {
    this.tagList.addEventListener('click', this.onTagClick.bind(this));
    this.matchList.addEventListener('click', this.onBookClick.bind(this));
    this.clearButton.addEventListener('click', this.onClearButtonClick.bind(this));
  }

  onTagClick(event) { 
    if (event.target.getAttribute('data-type') !== 'tag') return;
  
    this.setState({
      selectedTag: event.target.innerText,
      selectedBookId: '',
    });
  }

  onBookClick(event) { 
    if (event.target.getAttribute('data-type') !== 'book') return;
  
    this.setState({
      selectedBookId: event.target.getAttribute('data-id'),
    });
  }

  onClearButtonClick(event) { 
    this.setState({
      selectedTag: '',
      selectedBookId: '',
    });
  }

  renderTagList() {
    const { tags, selectedTag } = this.state;

    this.tagList.innerHTML = '';
    tags.map(tagTitle => {
      const classNames = ['button', 'is-link', 'is-normal'];
      if (selectedTag === tagTitle) classNames.push('is-active');

      this.tagList.appendChild(listItemTemplate({
        innerElementText: tagTitle,
        innerElementAttributes: {
          'data-type': 'tag'
        },
        innerElementClassNames: classNames
      }));
    });
  }

  renderMatchList() {
    const { data, selectedTag, selectedBookId } = this.state;
    const books = data.filter((book) => book.tags.includes(selectedTag));

    this.matchList.innerHTML = '';
    books.map(book => {
      this.matchList.appendChild(listItemTemplate({
        classNames: selectedBookId === book.id ? ['is-active'] : [],
        innerElementHtmlTag: 'a',
        innerElementText: book.title,
        innerElementAttributes: {
          'data-type': 'book',
          'data-id': book.id
        },
        innerElementClassNames: ['is-link']
      }));
    });
  }

  renderBook() {
    const { selectedBookId, data } = this.state;
    const book = data.find((book) => book.id === selectedBookId);

    this.selectedBook.innerHTML = '';
    this.selectedBook.appendChild(bookTemplate(book || {}));
  }

  setState(newState) {
    const prevState = { ...this.state };
  
    this.state = {
      ...prevState,
      ...newState,
    }

    this.render();
  }

  render() {
    const { selectedTag } = this.state;

    this.renderTagList();
    this.renderMatchList();
    this.renderBook();

    this.config.element.querySelector('#selected-tag-heading').innerHTML = selectedTag || 'No Tag Selected';

    if (selectedTag) {
      this.clearButton.removeAttribute('disabled');
    } else {
      this.clearButton.setAttribute('disabled', '');
    }
  }
}