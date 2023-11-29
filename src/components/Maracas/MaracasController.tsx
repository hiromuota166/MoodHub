"use client";
import useSoundEvents from "@/customhooks/useSoundEvents";
import { useState } from "react";
import LightMaracas from "./LightMaracas";
import VolumeButton from "./VolumeButton";
import SensorButton from "./SensorButton";
import MaracasModal from "./MaracasModal";
import Show3dObj from "./Show3dObj";
import NightModeSwitch from "../NightModeSwitch";
import { useCustomColorMode } from "@/customhooks/useCustomColorMode";
import MaracasSelectMenu from "./MaracasSelectMenu";

interface MaracasControllerProps {
  mode: "normal" | "special" | "light";
}

const MaracasController = (props: MaracasControllerProps) => {
  const { mode } = props;
  const modeText =
    mode === "normal" ? "ノーマル" : mode === "special" ? "スペシャル" : "軽量";
  const [shakeInterval, setShakeInterval] = useState(80); // シェイクのインターバル
  const [shakeThreshold, setShakeThreshold] = useState(15); // シェイクの閾値
  const { colorMode, toggleColorMode } = useCustomColorMode();
  const feverMode = colorMode === "dark" ? true : false;

  const {
    adjustVolume,
    toggleMute,
    isMuted,
    volume,
    isDevicemotionPermissionGranted,
    requestDeviceMotion,
    audioFiles,
    audioFile,
    setAudioFile,
  } = useSoundEvents(shakeThreshold, shakeInterval);

  const handleMaracasSensitivityChange = (value: number) => {
    setShakeInterval(value); // スライダーの値をステートにセット
  };

  const handleMaracasVibrationIntensityChange = (value: number) => {
    setShakeThreshold(value); // スライダーの値をステートにセット
  };
  return (
    <div>
      <div className="absolute bottom-2 right-0 md-top-8 md-right-8 w-full z-10">
        <div className="flex md:block justify-between">
          <div className="flex flex-col md:flex-row md:justify-end gap-2 my-2 mr-2">
            <MaracasSelectMenu modeText={modeText} />
          </div>
          <div className="grid grid-cols-2 md:flex md:justify-end gap-2 my-2 mr-2">
            <div className="w-fit">
              <SensorButton
                colorMode={colorMode}
                handleToggleSensor={requestDeviceMotion}
                sensorOn={isDevicemotionPermissionGranted}
              />
            </div>
            <div className="">
              <NightModeSwitch
                colorMode={colorMode}
                onToggle={toggleColorMode}
              />
            </div>
            <div className="w-fit">
              <VolumeButton
                Volume={volume}
                isMuted={isMuted}
                colorMode={colorMode}
                handleToggleMute={toggleMute}
              />
            </div>
            <div className="w-fit">
              <MaracasModal
                MaracasSensitivity={shakeInterval}
                handleMaracasSensitivityChange={handleMaracasSensitivityChange}
                MaracasVibrationIntensity={shakeThreshold}
                handleMaracasVibrationIntensityChange={
                  handleMaracasVibrationIntensityChange
                }
                isMuted={isMuted}
                toggleMute={toggleMute}
                Volume={volume}
                colorMode={colorMode}
                handleVolumeChange={adjustVolume}
                handleMaracasSoundSwitch={toggleMute}
                audioFiles={audioFiles}
                audioFile={audioFile}
                setAudioFile={setAudioFile}
              />
            </div>
          </div>
        </div>
      </div>
      {mode === "light" && <LightMaracas />}
      {mode === "normal" && <Show3dObj mode="normal" feverMode={feverMode} />}
      {mode === "special" && <Show3dObj mode="special" feverMode={feverMode} />}
    </div>
  );
};

export default MaracasController;
