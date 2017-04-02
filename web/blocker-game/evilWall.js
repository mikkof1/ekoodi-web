/**
 * Created by ekoodi on 29.3.2017.
 */
gameApp.evilWall = function (id, x, upperY, upperHeight, downerY, downerHeight, width, color) {
    return {
        id: id,
        x: x,
        upperY: upperY,
        upperHeight: upperHeight,
        downerY: downerY,
        downerHeight: downerHeight,
        width: width,
        color: color
    }
}