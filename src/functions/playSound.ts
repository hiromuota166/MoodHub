const playSound = async () => {
    const audio = new Audio("/maracas-sound.wav");
    audio.play();
};

export default playSound;