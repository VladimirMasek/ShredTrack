export function getTrickFinished(trickId, userTrickList) {
  const foundTrick = userTrickList.find((item) => item.id === trickId);
  return foundTrick ? foundTrick.finished : false;
}
