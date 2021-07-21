const toFeet = (n) => {
    n = Number(n);
    const realFeet = ((n*0.393700) / 12);
    const feet = Math.floor(realFeet);
    const inches = ((realFeet - feet) * 12).toFixed(2)
    return feet + "ft and " + inches + "inch";
}

module.exports = toFeet;