import Mixin from '@ember/object/mixin';

export default Mixin.create({
    page: 1,
    perPage: 30,
    
    currentPageItems: function() {
        let current_page = this.get('page');
        if (!current_page || current_page < 0 || current_page > this.get('numPages')) {
            current_page = 1;
        }
        let per_page = this.get('perPage');
        let start = (current_page - 1) * per_page;
        let selected = this.get('allItems').slice(start, start + per_page);
        return selected;
    }.property('allItems', 'page'),
    
    pagesList: function() { 
        let pages = [];
        for (var i = 0; i < this.numPages(); i++) {
            pages.push(i + 1);
        }
        return pages;
    }.property('allItems', 'page'),
    
    numPages: function() {
        let fraction = this.get('allItems').length / this.get('perPage');
        return Math.ceil(fraction);
    }
});
