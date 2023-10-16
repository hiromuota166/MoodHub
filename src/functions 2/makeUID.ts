//0から10000000までのランダムな数字を生成する
export const makeUID = () => {
    return Math.floor(Math.random() * 10000000);
}
