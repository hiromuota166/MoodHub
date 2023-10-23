import { useState, useRef, useCallback, useEffect } from 'react';

const useAudioPlayer = (audioFile: string) => {
    const [loadingState, setLoadingState] = useState<"init" | "loading" | "loaded" | "error">("init");
    const audioContextRef = useRef<AudioContext | null>(null);
    const audioBufferRef = useRef<AudioBuffer | null>(null);

    // 音声ファイルを読み込む関数
    const loadAudio = async () => {
        setLoadingState("loading");
        try {
            if (typeof window !== "undefined" && audioContextRef.current) {
                const response = await fetch("/maracas-sound.mp3");
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
            loadAudio();
        }
        return () => {
            audioContextRef.current?.close(); // Clean up the AudioContext when component is unmounted
        };
    }, []);

    // 音声を再生する関数
    const playSound = useCallback(() => {
        if (!audioBufferRef.current || !audioContextRef.current) return;
        const source = audioContextRef.current.createBufferSource();
        source.buffer = audioBufferRef.current;
        source.connect(audioContextRef.current.destination);
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
    };
};

export default useAudioPlayer;
