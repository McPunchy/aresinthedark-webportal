import Controller from '@ember/controller';
import { inject as service } from '@ember/service';

export default Controller.extend({
    ajax: service(),
    handleSave: function() {
        let aj = this.get('ajax');
        aj.requestOne('saveTinker', { text: this.get('model.text') }, null)
        .then( (response) => {
            if (response.error) {
                return;
            }
        
        this.get('flashMessages').success('File saved!  You can now use the tinker command in-game.');
        });  
    },
    actions: {
        editorChanged: function(text) {
            this.set('model.text', text);
        },
        reset: function() {
            this.set('model.text', this.get('model.default'));
            this.handleSave();
        },
        save: function() { 
            this.handleSave();
        }
    }
});

