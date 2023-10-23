const requestDeviceMotionPermission = async () => {
    if (
        typeof DeviceMotionEvent !== "undefined" &&
        typeof (DeviceMotionEvent as any).requestPermission === "function"
    ) {
        try {
            const permission: PermissionState = await (DeviceMotionEvent as any).requestPermission();
            return permission === "granted";
        } catch (error) {
            console.error("Permission request was denied:", error);
            return false;
        }
    } else {
        // For browsers that do not need explicit permission
        return true;
    }
};

export default requestDeviceMotionPermission;