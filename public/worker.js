self.addEventListener('message', (event) => {
    switch (event.data.action) {
        case 'START_ACCELERATION_MONITORING':
            startAccelerationMonitoring();
            break;
        case 'STOP_ACCELERATION_MONITORING':
            stopAccelerationMonitoring();
            break;
        default:
            console.error('Unknown action:', event.data.action);
    }
});

let monitoring = false;

const startAccelerationMonitoring = () => {
    if (monitoring) return;

    monitoring = true;

    // ここでdevicemotionイベントを監視します。
    self.addEventListener('devicemotion', handleDeviceMotion);
};

const stopAccelerationMonitoring = () => {
    if (!monitoring) return;

    monitoring = false;

    // 監視を停止します。
    self.removeEventListener('devicemotion', handleDeviceMotion);
};

const handleDeviceMotion = (e) => {
    const ax = e.acceleration?.x || 0;
    const ay = e.acceleration?.y || 0;
    const az = e.acceleration?.z || 0;

    // このサンプルでは、単に加速度データをメインスレッドに返しています。
    self.postMessage({
        action: 'ACCELERATION_DATA',
        data: { ax, ay, az }
    });
};
