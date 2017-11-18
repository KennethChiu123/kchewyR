export default function loadInstagram() {
  return new Promise((resolve) => {
    resolve({
      message: 'This came from the ig server',
      time: Date.now()
    });
  });
}
