export const fifteenMinutesLaterTimeString = () => {
    const anHourLater = new Date();
    anHourLater.setMinutes(anHourLater.getMinutes() + 15);

    return anHourLater.toTimeString().slice(0, 5);
};
