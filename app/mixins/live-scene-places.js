import Mixin from '@ember/object/mixin';

export default Mixin.create({
    showPlaces: false,
    selectPlace: false,
    newPlace: null,

  actions: {

      changePlace() {
          let api = this.get('gameApi');

          // Needed because the onChange event doesn't get triggered when the list is 
          // first loaded, so the place string is empty.
          let defaultPlace = this.get('places')[0] ? this.get('places')[0].name : null;
          let newPlace = this.get('newPlace') || defaultPlace;
    
          this.set('selectPlace', false);
          this.set('newPlace', null);
          
          if (!newPlace) {
              this.get('flashMessages').danger("You haven't selected a place.");
              return;
          }

          api.requestOne('changePlace', { scene_id: this.get('scene.id'),
              place_name: newPlace }, null)
          .then( (response) => {
              if (response.error) {
                  return;
              }
          });
      },
      
      viewPlaces() {
          let api = this.get('gameApi');

          api.requestOne('viewPlaces', { scene_id: this.get('scene.id') })
          .then( (response) => {
              if (response.error) {
                  return;
              }
              this.set('places', response.places);
              this.set('showPlaces', true);
          });
      }
  }
});