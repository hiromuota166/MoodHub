import { useState, useCallback, useEffect } from "react";
import requestDeviceMotionPermission from "@/functions/requestDeviceMotionPermission";

const useDeviceMotion = (threshold: number = 20) => {
  const [acceleration, setAcceleration] = useState<{
    x: number;
    y: number;
    z: number;
  }>({ x: 0, y: 0, z: 0 });
  const [isDevicemotionPermissionGranted, setIsDevicemotionPermissionGranted] =
    useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      requestDeviceMotionPermission().then((permission) => {
        setIsDevicemotionPermissionGranted(permission);
      });
    }
  }, []);

  const requestDeviceMotion = useCallback(async () => {
    console.log("requestDeviceMotion", isDevicemotionPermissionGranted);
    if (isDevicemotionPermissionGranted) {
      setIsDevicemotionPermissionGranted((prev) => !prev);
      return !isDevicemotionPermissionGranted;
    } else {
      const permission = await requestDeviceMotionPermission();
      setIsDevicemotionPermissionGranted(permission);
      return permission;
    }
  }, [isDevicemotionPermissionGranted]);

  // 加速度の大きさを計算して、閾値を超えているか判定する関数
  const detectAcceleration = useCallback(
    (x: number, y: number, z: number) => {
      const magnitude = Math.sqrt(x ** 2 + y ** 2 + z ** 2);
      return magnitude >= threshold;
    },
    [threshold]
  );

  const updateAndDetectAcceleration = useCallback(
    (e: DeviceMotionEvent) => {
      const ax = e.acceleration?.x || 0;
      const ay = e.acceleration?.y || 0;
      const az = e.acceleration?.z || 0;
      setAcceleration({ x: ax, y: ay, z: az });
      return detectAcceleration(ax, ay, az);
    },
    [detectAcceleration]
  );

  return {
    acceleration,
    isDevicemotionPermissionGranted,
    requestDeviceMotion,
    updateAndDetectAcceleration,
  };
};

export default useDeviceMotion;
