//Absract widget
MegxMapWidget = function (layerSetName, config) {

  this.gmsBaseURL = 'http://mb3is.megx.net/wms';

  this.init(layerSetName, config, this.gmsBaseURL);
}

MegxMapWidget.prototype = {
  init : function (layerSetName, config, gu) {

    this.renderLayoutSceleton('megxMapWidget');

    this.map = new OpenLayers.Map('megxMap', {
        controls : [],
        numZoomLevels : 16,
        projection : "EPSG:4326"
      });

    this.LAYERSET = {
      'esa' : ['satellite_mod', 'esa']
    };

    this.infoPanel = '#layersAccordion';

    this.initMap(this.map);

    //console.log("Init map on gmsURL = " + config.gmsURL);

    this.layers = new MegxMapWidgetLayers({
        gms_wms_url : 'http://mb3is.megx.net/wms',
        sam_genomes : 'genome',
        sam_metagenomes : 'metagenome',
        sam_phages : 'phage',
        sam_rrna : '',
        extent : new OpenLayers.Bounds(-180, -90, 180, 90)
      });

    var layerset = this.LAYERSET[layerSetName.toLowerCase()];

    if (layerset) {
      for (var i = 0; i < layerset.length; i++) {
        this.map.addLayer(this.layers.get(layerset[i]));
        this.addAccordionChild(layerset[i]);
      }
    }

    this.accordifyInfoPanel();

    var map = this.map;

    //map.setBaseLayer(this.layers.get('satellite_mod'));
    //map.setCenter(new OpenLayers.LonLat(lon, lat), 0);
    if (!map.getCenter()) {
      map.zoomToMaxExtent();
    }
  },

  renderLayoutSceleton : function (layoutParent) {
    var layoutParentSelector = '#' + layoutParent;
    var layoutHtml = ['<table style="width: 99%; margin-top:10px; margin-bottom:10px;">',
      '<tr>',
      '<td id="layersAccordion" style="width: 30%; padding-left:10px;">',
      '</td>',
      '<td class="mapPlaceholder">',
      
      '<div id="megxMap" style="width: 900px; height: 450px"></div>',
     
      '</td>',
      '</tr>',
      '</table>'
    ].join('');

    $(layoutParentSelector).append(layoutHtml);
  },

  addAccordionChild : function (layer) {
    var htmlToAppend = ['<div class="group">',
      '<h3>', layer, '</h3>',
      '<div>',
      '<p>Some layer desc etc...</p>',
      '</div>',
      '</div>'
    ].join('');
    $(this.infoPanel).append(htmlToAppend);
  },

  initMap : function (map) {
    var navContr = new OpenLayers.Control.Navigation();
    navContr.setMap(map);

    map.addControl(navContr);
    map.addControl(new OpenLayers.Control.ScaleLine());
    map.addControl(new OpenLayers.Control.MousePosition());
    map.addControl(new OpenLayers.Control.KeyboardDefaults());
    var panZoomContr = new OpenLayers.Control.PanZoomBar();
    panZoomContr.setMap(map);
    map.addControl(panZoomContr);
    map.addControl(new OpenLayers.Control.Attribution());
    var permalinkContr = new OpenLayers.Control.Permalink('permalink');
    permalinkContr.setMap(map);
    map.addControl(permalinkContr);
  },

  accordifyInfoPanel : function () {
    $(this.infoPanel)
    .accordion({
      collapsible : true,
      heightStyle : "content",
      header : "> div > h3"
    })
    .sortable({
      axis : "y",
      handle : "h3",
      stop : function (event, ui) {
        // IE doesn't register the blur when sorting
        // so trigger focusout handlers to remove .ui-state-focus
        ui.item.children("h3").triggerHandler("focusout");
      }
    });
  },

  removeControl : function (controlName) {
    var controls = this.map.getControlsByClass(controlName);
    for (var i = 0; i < controls.length; i++) {
      controls[i].deactivate();
    }
  },

  addLayer : function (layer) {
    this.map.addLayer(layer);
  },

  showLayer : function (name) {
    this.layers.get(name).setVisibility(true);
  },

  hideLayer : function (name) {
    this.layers.get(name).setVisibility(false);
  },

  hideAll : function () {
    var names = this.layers.getLayersNames();
    for (var i = 0; i < names.length; i++) {
      this.hideLayer(names[i]);
    }
  },

  reorder : function (arr) {
    // argument array, new order of layers on the map
    //TODO: showLayer
  },

  setTopClickable : function (name) {
    //TODO: set clickable layer, show on top order ...
  },

  redraw : function (name) {
    name = name || '';
    return this.layers.get(name).redraw();
  }
};