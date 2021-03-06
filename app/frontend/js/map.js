import 'ol/ol.css'
import GeoJSON from 'ol/format/GeoJSON'
import Map from 'ol/Map'
import View from 'ol/View'
import { XYZ, Vector as VectorSource } from 'ol/source'
import { Tile as TileLayer, Vector as VectorLayer, Group } from 'ol/layer'
import Select from 'ol/interaction/Select'
import { click, pointerMove } from 'ol/events/condition'
import TileGrid from 'ol/tilegrid/TileGrid'
import { landParcelStyles, landCoverStyles, highlightStyle, selectedStyle } from './map-styles'

const styleFunction = (feature) => {
  const label = `${feature.get('sheetId')} ${feature.get('parcelId')}`

  if (feature.get('land_cover_class_code')) {
    const landCoverClassCode = feature.get('land_cover_class_code')
    const landCoverClassCodeStyle = landCoverStyles.find(({ Code }) => Code === landCoverClassCode)

    if (landCoverClassCodeStyle) {
      landCoverClassCodeStyle.Polygon.getText().setText(label)
      return landCoverClassCodeStyle[feature.getGeometry().getType()]
    }
    landCoverStyles[0].Polygon.getText().setText(label)
    return landCoverStyles[0][feature.getGeometry().getType()]
  }
  landParcelStyles.Polygon.getText().setText(label)
  return landParcelStyles[feature.getGeometry().getType()]
}

const tilegrid = new TileGrid({
  resolutions: [896.0, 448.0, 224.0, 112.0, 56.0, 28.0, 14.0, 7.0, 3.5, 1.75],
  origin: [-238375.0, 1376256.0]
})

const mapStyles = [
  'Road_27700',
  'Outdoor_27700',
  'Light_27700',
  'Leisure_27700']

const buildMapLayers = (parcelSource, apiKey) => {
  const parcelLayer = new VectorLayer({ source: parcelSource, style: styleFunction })

  const layers = []

  const mapStyleLayers = mapStyles.length

  for (let i = 0; i < mapStyleLayers; ++i) {
    layers.push(
      new TileLayer({
        title: 'Road',
        type: 'base',
        visible: false,
        source: new XYZ({
          url: `https://api.os.uk/maps/raster/v1/zxy/${mapStyles[i]}/{z}/{x}/{y}.png?key=${apiKey}`,
          tileGrid: tilegrid
        }),
        className: 'grayscale-invert'
      })
    )
  }

  layers.push(parcelLayer)

  return layers
}

const resetSelectAll = () => {
  const selectAll = document.getElementById('selectAllParcels')
  selectAll.checked = false
}

const selectLayer = (map) => {
  const selectClick = new Select({
    condition: click,
    toggleCondition: click,
    style: selectedStyle
  })

  selectClick.on('select', function (e) {
    const parcelId = e.selected.length
      ? `${e.selected[0].values_.sheetId}${e.selected[0].values_.parcelId}`
      : `${e.deselected[0].values_.sheetId}${e.deselected[0].values_.parcelId}`
    const parcelCheckBox = document.getElementById(parcelId)
    parcelCheckBox.checked = !parcelCheckBox.checked
    resetSelectAll()
  })

  map.addInteraction(selectClick)
  return selectClick
}

const selectPointerMove = (map) => {
  const selectMove = new Select({
    condition: pointerMove,
    style: highlightStyle
  })

  selectMove.on('select', function (e) {
    if (e.selected.length) {
      const parcelId = `${e.selected[0].values_.sheetId}${e.selected[0].values_.parcelId}`
      document.getElementById('parcelInfo').innerHTML = parcelId
    }
  })

  map.addInteraction(selectMove)
}

const convertToParcelSheetId = (parcelId) => {
  return parcelId.match(/(.{1,6})/g)
}

const addCheckboxEventListener = (checkbox, selectfeatures, parcelSource) => {
  checkbox.addEventListener('change', (e) => {
    addToSelectFeatures(selectfeatures, parcelSource, e.target, e.target.id)
    e.target.id !== 'selectAllParcels' && resetSelectAll()
  })
}

const selectAllParcels = (selectfeatures, parcelSource) => {
  const selectAll = document.getElementById('selectAllParcels')
  checkSelectAllParcels(selectAll)
  selectAll.addEventListener('change', () => {
    const checkBoxes = document.getElementsByClassName('govuk-checkboxes__input')
    for (const checkbox of checkBoxes) {
      checkbox.checked = selectAll.checked
      addToSelectFeatures(selectfeatures, parcelSource, checkbox, checkbox.id)
    }
  })
}

const checkSelectAllParcels = (selectAll) => {
  const parcels = document.querySelectorAll('input[name="parcels"]').length
  const selectedParcels = document.querySelectorAll('input[name="parcels"]:checked').length
  selectAll.checked = parcels === selectedParcels
}

const addToSelectFeatures = (selectfeatures, parcelSource, target, id) => {
  const parcelId = convertToParcelSheetId(target.id)
  const parcelFeatures = parcelSource.getFeatures()
  for (const feature of parcelFeatures) {
    if (feature.get('parcelId') === parcelId[1] && feature.get('sheetId') === parcelId[0]) {
      target.checked ? selectfeatures.push(feature) : selectfeatures.remove(feature)
    }
  }
}

const checkBoxSelection = (parcelSource, selectfeatures) => {
  const checkBoxes = document.getElementsByClassName('govuk-checkboxes__input')
  for (const checkbox of checkBoxes) {
    addCheckboxEventListener(checkbox, selectfeatures, parcelSource)
  }
}

const parcelSelection = (map, allowSelect, selectedParcels, parcelSource) => {
  if (allowSelect) {
    const selectClick = selectLayer(map)
    const selectfeatures = selectClick.getFeatures()
    checkBoxSelection(parcelSource, selectfeatures)
    selectPointerMove(map)
    preParcelSelection(selectedParcels, parcelSource, selectfeatures)
    selectAllParcels(selectfeatures, parcelSource)
  }
}

const preParcelSelection = (selectedParcels, parcelSource, selectfeatures) => {
  for (const parcel of selectedParcels) {
    const parcelId = convertToParcelSheetId(parcel.id)
    const parcelFeatures = parcelSource.getFeatures()
    for (const feature of parcelFeatures) {
      if (feature.get('parcelId') === parcelId[1] && feature.get('sheetId') === parcelId[0]) {
        selectfeatures.push(feature)
      }
    }
  }
}

const selectMapStyle = (layers) => {
  const select = document.getElementById('layer-select')

  const onChange = () => {
    const style = select.value
    const totalLayers = layers.length - 1

    for (let i = 0; i < totalLayers; ++i) {
      layers[i].setVisible(mapStyles[i] === style)
    }
  }

  select.addEventListener('change', onChange)

  onChange()
}

export function displayMap (apiKey, parcels, coordinates, selectedParcels = [], allowSelect = false) {
  const features = new GeoJSON().readFeatures(parcels)
  const parcelSource = new VectorSource({ features })
  const layers = buildMapLayers(parcelSource, apiKey)

  const layerGroup = [
    new Group({
      title: 'Base maps',
      layers
    })
  ]

  const view = new View({
    center: coordinates,
    zoom: 7,
    extent: [-238375.0, 0.0, 900000.0, 1376256.0],
    resolutions: tilegrid.getResolutions()
  })

  const map = new Map({ // eslint-disable-line no-unused-vars
    layers: layerGroup,
    target: 'map',
    view
  })

  parcelSelection(map, allowSelect, selectedParcels, parcelSource)
  map.getView().fit(parcelSource.getExtent(), { size: map.getSize(), maxZoom: 16 })
  selectMapStyle(layers)
}
