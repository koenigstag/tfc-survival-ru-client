var skinSrc = {
  current: 'http://localhost:5001/static/skins/',
};

function getSkinSrc () {
  let params = new URL(document.location).searchParams;
  let filename = params.get('filename');
  if (!Boolean(filename) || filename === 'undefined' || filename === 'null') {
    filename = 'steve.png';
  }
  // console.log('filename', filename);
  return skinSrc.current + filename;
}
