export default function loadYTVideos() {
  return new Promise((resolve) => {
    resolve({
      message: 'This came from the yt server',
      time: Date.now()
    });
  });
}
