var ViewModel = function() {
    var self = this;
    this.currentCat =  ko.observable(new Cats());
    this.incrementCounter = function () {
      self.currentCat().clickCount(self.currentCat().clickCount()+1);
    };

}
var Cats = function() {
  this.clickCount = ko.observable(0);
  this.name = ko.observable("Tabby");
  this.imgSrc = ko.observable("img/434164568_fea0ad4013_z.jpg");
  this.imgAttribution = ko.observable("wowog...link");
  this.nicknames = ko.observableArray(["tabby","tom","voila"]);


  this.stage = ko.computed(function() {
      if(this.clickCount()>10){
      return "nacho";
    }
  }, this);
}

ko.applyBindings(new ViewModel());
