import textures from 'textures';

export const patterns = {
  none: null,
  UNKNOWN: textures.lines().size(6).strokeWidth(0.5),
  PATTERN_01: textures.lines(),
  PATTERN_02: textures.lines().heavier(),
  PATTERN_03: textures.lines().lighter(),
  PATTERN_04: textures.lines().thicker(),
  PATTERN_05: textures.lines().size(6).thinner(),
  PATTERN_06: textures.lines().heavier(10).thinner(1.5),
  PATTERN_07: textures.lines().size(4).strokeWidth(1),
  PATTERN_08: textures.lines().size(8).strokeWidth(2),
  PATTERN_09: textures.lines().size(8).orientation('vertical').strokeWidth(1),
  PATTERN_10: textures.lines().size(6).orientation('horizontal').strokeWidth(1),
  PATTERN_11: textures.lines().size(6).orientation('3/8'),
  PATTERN_12: textures.lines().size(6).orientation('3/8', '7/8'),
  PATTERN_13: textures
    .lines()
    .size(4)
    .orientation('vertical', 'horizontal')
    .strokeWidth(1)
    .shapeRendering('crispEdges'),
  PATTERN_14: textures.circles(),
  PATTERN_15: textures.circles().size(5),
  PATTERN_16: textures.circles().size(8).heavier(),
  PATTERN_17: textures.circles().size(8).lighter(),
  PATTERN_18: textures.circles().size(8).thicker(),
  PATTERN_19: textures.circles().size(6).complement(),
  PATTERN_20: textures.circles().radius(4),
  PATTERN_21: textures.circles().radius(4).fill('transparent').strokeWidth(1),
  PATTERN_22: textures
    .circles()
    .radius(4)
    .fill('transparent')
    .strokeWidth(1)
    .complement(),
  PATTERN_23: textures.circles().size(8).radius(2),
  PATTERN_24: textures.paths().d('hexagons').size(8).strokeWidth(2),
  PATTERN_25: textures.paths().d('crosses').size(8).lighter().thicker(),
  PATTERN_26: textures.paths().d('woven').size(8).lighter().thicker(),
  PATTERN_27: textures.paths().d('waves').size(8).lighter().thicker(),
  PATTERN_28: textures.paths().d('waves').size(8).thicker(),
  PATTERN_29: textures
    .paths()
    .d('nylon')
    .size(8)
    .lighter()
    .shapeRendering('crispEdges'),
  PATTERN_30: textures.paths().d('squares').size(8).lighter(),
};
