var skinSrc = {
  current: 'http://localhost:5001/static/skins/',
};

function getSkinSrc () {
  let params = new URL(document.location).searchParams;
  let filename = params.get('filename');
  console.log('filename', filename);
  if (!Boolean(filename) || filename === 'undefined' || filename === 'null') {
    filename = 'steve.png';
  }
  return skinSrc.current + filename;
}
