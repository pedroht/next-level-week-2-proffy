export default function convertMinutesToHourString(time: number) {
  const hours = ("0" + time / 60).slice(-2);
  let minutes = ("0" + (time % 60)).slice(-2);

  return String(`${hours}:${minutes}`);
}
