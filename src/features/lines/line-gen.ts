import {svgHeight, svgWidth} from '@/utils/svg-size.ts';
import {randomIntBetween} from '@/utils/random.ts';

export const generateLineCurves = ({density, orientation, rangeA, rangeB}: { density: number, orientation: 'horizontal' | 'vertical' }) => {

  let path = '';
  const count = svgWidth * svgHeight * density / 10000;

  let pointA;
  let pointB;
  if (orientation === 'horizontal') {
    pointA = getTopPoint();
    pointB = getBottomPoint();
  } else {
    pointA = getLeftPoint();
    pointB = getRightPoint();
  }
  const pointAString = pointString(pointA);
  const pointBString = pointString(pointB);

  function getLine() {

    let pointC;
    let pointD;
    if (orientation === 'horizontal') {
      pointC = pointString(getLeftPoint(rangeA, rangeB));
      // const center = pointString([svgWidth / 2, svgHeight / 2]);
      pointD = pointString(getRightPoint(rangeA, rangeB));
    } else {
      pointC = pointString(getTopPoint());
      pointD = pointString(getBottomPoint());
    }

    return ` M ${pointC} C ${pointAString} ${pointBString} ${pointD}`;
  }

  for (let i = 0; i < count; i++) {
    path += getLine();
  }
  return `<path d="${path}"></path><circle fill="#000" cx="${pointA[0]}" cy="${pointA[1]}" r="10"></circle><circle fill="#000"  cx="${pointB[0]}" cy="${pointB[1]}" r="10"></circle>`;
};

function getPointByIndex(index: number): number[] {
  switch (index % 4) {
    case 0:
      return getLeftPoint();
    case 1:
      return getRightPoint();
    case 2:
      return getTopPoint();
    case 3:
      return getBottomPoint();
    default:
      return [0, 0];
  }
}

function getLeftPoint(rangeA = 0, rangeB = svgWidth) {
  return [0, randomIntBetween(rangeA, rangeB)];
}

function getRightPoint(rangeA = 0, rangeB = svgWidth) {
  return [svgWidth, randomIntBetween(rangeA, rangeB)];
}

function getTopPoint(rangeA = 0, rangeB = svgWidth) {
  return [randomIntBetween(rangeA, rangeB), 0];
}

function getBottomPoint() {
  return [randomIntBetween(0, svgWidth), svgHeight];
}

function getControlPoint() {
  return [randomIntBetween(0, svgWidth), randomIntBetween(0, svgHeight)];
}

function pointString(point: number[]) {
  return `${point[0]} ${point[1]} `;
}
