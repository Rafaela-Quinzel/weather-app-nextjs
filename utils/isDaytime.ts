export function isDaytime(
  sunrise: number,
  sunset: number,
  timezone: number
) {
  const nowUTC = Date.now() / 1000;
  const localNow = nowUTC + timezone;

  return localNow >= sunrise && localNow < sunset;
}