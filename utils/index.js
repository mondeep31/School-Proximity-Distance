const getDistanceBetweenCoordinates = (userLatitude, userLongitude, schoolLatitude, schoolLongitude) => {
    //degree to radian
    const toRadian = value => (value * Math.PI) / 180;
    const radiusOfEarth = 6371; // Earth radius in km

    const diffInLatitude = toRadian(schoolLatitude - userLatitude);
    const diffInLongitude = toRadian(schoolLongitude - userLongitude);

    //haversine formula : calculates the distance betn two points
    // on a sphere with their lats and longs
    const haversineTerm = Math.sin(diffInLatitude / 2) * Math.sin(diffInLatitude / 2) +
        Math.cos(toRadian(userLatitude)) * Math.cos(toRadian(schoolLatitude)) *
        Math.sin(diffInLongitude / 2) * Math.sin(diffInLongitude / 2);

    //atan -> inverse tangent
    //centralAngle -> angular distance in radians
    const centralAngle = 2 * Math.atan2(Math.sqrt(haversineTerm), Math.sqrt(1 - haversineTerm));

    return radiusOfEarth * centralAngle; // Distance in km
};

module.exports = { getDistanceBetweenCoordinates }