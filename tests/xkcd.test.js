var expect = require('chai').expect,
    xkcd   = require('../comics/xkcd.js');

describe('Test XKCD', function () {
  it('should return a random xkcd comic metadata', function(done) {
    xkcd.getRandom(function (err, res) {
      expect(err).to.not.exist;
      expect(res).to.have.all.keys('title', 'alttext', 'comic_url', 'img_url');
      done();
    });
  });
  it('should return a specific comic numbers metadata', function (done) {
    var comic_num = 2
    xkcd.getComicNum(comic_num, function (err, res) {
      expect(err).to.not.exist;
      expect(res).to.have.all.keys('title','alttext', 'comic_url', 'img_url')
      expect(res.comic_url).to.be.equal(xkcd.XKCD_BASE_URL + comic_num.toString());
      done();
    });
  });

  it('should return the latest comics metadata if comic number is -1', function (done) {
    var comic_num = -1
    xkcd.getComicNum(comic_num, function (err, res) {
      expect(err).to.not.exist;
      expect(res).to.have.all.keys('title','alttext', 'comic_url', 'img_url', 'latest_num')
      expect(res.comic_url).to.be.equal(xkcd.XKCD_BASE_URL);
      done();
    });
  });

  it('should return the latest comics metadata', function (done) {
    xkcd.getLatest(function (err, res) {
      expect(err).to.not.exist;
      expect(res).to.have.all.keys('title','alttext', 'comic_url', 'img_url', 'latest_num')
      expect(res.comic_url).to.be.equal(xkcd.XKCD_BASE_URL);
      done();
    });
  });

  it('should return the latest comics if a comic that is not published is requested', function (done) {
    var comic_num = ['22222'];
    xkcd.getComic(comic_num, function (res) {
      expect(res).to.exist;
      expect(res).to.have.all.keys('attachments');
      expect(res.attachments[0]).to.have.any.keys('pretext', 'author_name', 'author_link', 'author_icon', 'title', 'title_link', 'text', 'image_url');
      expect(res.attachments[0].title_link).to.be.equal(xkcd.XKCD_BASE_URL);
      done();
    });
  });
});
