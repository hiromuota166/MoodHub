import sensorOnImg from "public/sensor-on.svg";
import sensorOffImg from "public/sensor-off.svg";
import sensorOnDarkImg from "public/sensor-on-night.svg";
import sensorOffDarkImg from "public/sensor-off-night.svg";
import Image from "next/image";
import React, { useMemo } from "react";
import { memo } from "react";

interface SensorButtonProps {
  colorMode: "dark" | "light";
  sensorOn: boolean;
  handleToggleSensor: () => void;
}

const SensorButton: React.FC<SensorButtonProps> = memo(
  function SensorButton(props) {
    const { handleToggleSensor, colorMode, sensorOn } = props;
    // Volumeをモードに変換し、メモ化
    // モードに応じて画像を切り替える
    const colorModeMemo = useMemo(
      () => (colorMode === "dark" ? "dark" : "light"),
      [colorMode]
    );
    return (
      <button
        onClick={handleToggleSensor}
        className="p-4 shadow-boxOut rounded-3xl"
      >
        {colorModeMemo === "dark" && (
          <>
            {sensorOn ? (
              <Image src={sensorOnDarkImg} alt="センサーがオンになってます" />
            ) : (
              <Image src={sensorOffDarkImg} alt="センサーがオフになってます" />
            )}
          </>
        )}
        {colorModeMemo === "light" && (
          <>
            {sensorOn ? (
              <Image src={sensorOnImg} alt="センサーがオンになってます" />
            ) : (
              <Image src={sensorOffImg} alt="センサーがオフになってます" />
            )}
          </>
        )}
      </button>
    );
  },
  (prevProps, nextProps) => {
    // モードが変わった時、またはhandleToggleSensorが変わった時にのみ再レンダリング
    return (
      prevProps.handleToggleSensor === nextProps.handleToggleSensor &&
      prevProps.colorMode === nextProps.colorMode &&
      prevProps.sensorOn === nextProps.sensorOn
    );
  }
);

SensorButton.displayName = "SensorButton";

export default SensorButton;
