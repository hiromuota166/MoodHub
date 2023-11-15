import { useState, useRef, useCallback, useEffect } from "react";

const useAudioPlayer = (audioFilePath: string = "/maracas-sound.mp3") => {
	const [loadingState, setLoadingState] = useState<"init" | "loading" | "loaded" | "error">("init");
	const audioContextRef = useRef<AudioContext | null>(null);
	const audioBufferRef = useRef<AudioBuffer | null>(null);
	const gainNode = useRef<GainNode | null>(null);
	const [isMuted, setIsMuted] = useState(false);
	const [volume, setVolume] = useState(0);
	const lastVolumeRef = useRef(volume); // ミュート前の音量を保存するためのref

	// 音声ファイルを読み込む関数
	const loadAudio = async (audioFilePath: string) => {
		setLoadingState("loading");
		try {
			if (typeof window !== "undefined" && audioContextRef.current) {
				const response = await fetch(audioFilePath);
				const audioData = await response.arrayBuffer();
				audioBufferRef.current = await audioContextRef.current.decodeAudioData(audioData);
				setLoadingState("loaded");
			}
		} catch (error) {
			console.error("Failed to load audio:", error);
			setLoadingState("error");
		}
	};

	useEffect(() => {
		if (typeof window !== "undefined") {
			audioContextRef.current = new window.AudioContext();
			gainNode.current = audioContextRef.current.createGain();
			gainNode.current.connect(audioContextRef.current.destination);
			loadAudio(audioFilePath);
		}
		return () => {
			audioContextRef.current?.close(); // Clean up the AudioContext when component is unmounted
			gainNode.current = null;
		};
	}, [audioFilePath]);

	// 音量を調整する関数
	const adjustVolume = (volume: number) => {
		if (!gainNode.current) return;
		gainNode.current.gain.value = volume;
		setVolume(volume);
		// ミュート状態を更新
		setIsMuted(volume === 0);
		// 音量が0でない場合、現在の音量を保存
		if (volume > 0) {
			lastVolumeRef.current = volume;
		}
	};

	// ミュートする関数
	const mute = useCallback(() => {
		if (!gainNode.current) return;
		lastVolumeRef.current = volume; // 現在の音量を保存
		gainNode.current.gain.value = 0;
		setVolume(0);
		setIsMuted(true);
	}, [volume]);

	// アンミュートする関数
	const unmute = useCallback(() => {
		if (!gainNode.current) return;
		const lastVolume = lastVolumeRef.current; // 保存された音量を取得
		gainNode.current.gain.value = lastVolume; // アンミュート時のデフォルト音量
		setVolume(lastVolume);
		setIsMuted(false);
	}, []);

	// ミュートの状態を切り替える関数
	const toggleMute = useCallback(() => {
		isMuted ? unmute() : mute();
	}, [isMuted, mute, unmute]);

	// 音声を再生する関数
	const playSound = useCallback(() => {
		if (!audioBufferRef.current || !audioContextRef.current || !gainNode.current) return;
		const source = audioContextRef.current.createBufferSource();
		source.buffer = audioBufferRef.current;
		source.connect(gainNode.current);
		gainNode.current.connect(audioContextRef.current.destination);

		try {
			source.start(0);
		} catch (error) {
			if (error instanceof DOMException && error.name === "InvalidStateError") {
				console.error("InvalidStateError occurred:", error.message);
			} else {
				console.error("An unexpected error occurred:", error);
			}
		}
	}, [audioBufferRef, audioContextRef]);

	return {
		loadingState,
		playSound,
		reloadAudio: loadAudio,
		adjustVolume,
		mute,
		unmute,
		toggleMute,
		isMuted,
		volume,
	};
};

export default useAudioPlayer;
