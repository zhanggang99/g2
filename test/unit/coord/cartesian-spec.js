const expect = require('chai').expect;
const Util = require('../../../src/util');
const Cartesian = require('../../../src/coord/cartesian');

describe('Cartesian', function() {
  const coord = new Cartesian({
    start: {
      x: 0,
      y: 300
    },
    end: {
      x: 200,
      y: 0
    }
  });

  it('construction', function() {
    const center = coord.center;
    expect(center.x).to.equal(100);
    expect(center.y).to.equal(150);
  });

  it('convert', function() {
    let point = {
      x: 0.2,
      y: 0.7
    };
    point = coord.convert(point);
    expect(point.x).to.equal(40);
    expect(point.y).to.equal(90);
  });

  it('invert', function() {
    let point = {
      x: 40,
      y: 90
    };
    point = coord.invert(point);
    expect(point.x).to.equal(0.2);
    expect(point.y).to.equal(0.7);
  });

  it('getWidth and getHeight', function() {
    const width = coord.getWidth();
    const height = coord.getHeight();

    expect(width).to.equal(200);
    expect(height).to.equal(300);
  });

  it('translate', function() {
    let point = {
      x: 0.2,
      y: 0.7
    };
    coord.translate(100, 20);
    point = coord.convert(point);
    expect(point.x).to.equal(140);
    expect(point.y).to.equal(110);
    coord.translate(-100, -20);
  });

  it('rotate', function() {
    let point = {
      x: 0.5,
      y: 0.7
    };
    coord.rotate(Math.PI / 2);
    point = coord.convert(point);
    expect(point.x).to.equal(160);
    expect(point.y).to.equal(150);
    coord.rotate(-Math.PI / 2);
  });

  it('scale', function() {
    let point = {
      x: 0.5,
      y: 0.7
    };
    coord.scale(2, 2);
    point = coord.convert(point);
    expect(point.x).to.equal(100);
    expect(point.y).to.equal(30);
    coord.scale(0.5, 0.5);
  });

  it('reflect x', function() {
    let point = {
      x: 0.5,
      y: 0.7
    };
    coord.reflect('x');
    point = coord.convert(point);
    expect(point.x).to.equal(100);
    expect(point.y).to.equal(90);
    coord.reflect('x');
  });

  it('reflect y', function() {
    let point = {
      x: 0.3,
      y: 0.5
    };
    coord.reflect('y');
    point = coord.convert(point);
    expect(point.x).to.equal(60);
    expect(point.y).to.equal(150);
    coord.reflect('y');
  });

  it('trans', function() {
    coord.rotate(Math.PI / 2);
    const vector = coord.trans(1, 0);
    expect(Util.equal(vector[0], 0)).to.be.true;
    expect(Util.equal(vector[1], 1)).to.be.true;
  });

  it('reverse', function() {
    const vector = coord.reverse(0, 1);
    expect(Util.equal(vector[0], 1)).to.be.true;
    expect(Util.equal(vector[1], 0)).to.be.true;
  });
});
