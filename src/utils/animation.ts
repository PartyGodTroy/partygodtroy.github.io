import { Vector3, Animation } from "@babylonjs/core";

export function createLerpPositionKeyframes(
  startPosition: Vector3,
  endPosition: Vector3,
  frameRate: number,
  durationFrames: number
) {
  const keyFrames: { frame: number; value: Vector3 }[] = [];

  for (let i = 0; i <= durationFrames; i++) {
    const t = i / durationFrames;
    const lerpedPosition = Vector3.Lerp(startPosition, endPosition, t);
    keyFrames.push({
      frame: i,
      value: lerpedPosition,
    });
  }
  return keyFrames;
}

export function createLerpRotationKeyframes(
  startRotation: Vector3,
  endRotation: Vector3,
  frameRate: number,
  durationFrames: number
) {
  const keyFrames: { frame: number; value: Vector3 }[] = [];

  for (let i = 0; i <= durationFrames; i++) {
    const t = i / durationFrames;
    const lerpedRotation = Vector3.Lerp(startRotation, endRotation, t);
    keyFrames.push({
      frame: i,
      value: lerpedRotation,
    });
  }
  return keyFrames;
}
