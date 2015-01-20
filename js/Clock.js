function clock(x, y, r, speed, secondColor, firstColor)
{
    var firstColor = firstColor || '#ff0192';
    var secondColor = secondColor || '#9201ff';

    r = r * 2;

    var backgroundCircle = new paper.Path.Circle(x, y, r);
    backgroundCircle.fillColor = secondColor;

    var pie = generatePieForAngle(0, firstColor);

    var pieSymbol = new paper.Symbol(pie);
    var backgroundCircleSymbol = new paper.Symbol(backgroundCircle);

    var degrees = 0;
    var alter = false;

    function makeArcPoints(x, y, r, alpha)
    {
        var beta = alpha/2;
        var from = new paper.Point(x, y - r);
        var through = new paper.Point(x + Math.cos((beta-90)/180 * Math.PI) * r, y + Math.sin((beta-90)/180 * Math.PI)*r);
        var to = new paper.Point(x + Math.cos((alpha-90)/180 * Math.PI)*r, y + Math.sin((alpha-90)/180 * Math.PI)*r)
        
        return {from: from, through: through, to: to};
    }
    
    function generatePieForAngle(angle)
    {
        var arcPoints = makeArcPoints(x, y, r, angle);
    
        var path = paper.Path.Arc(arcPoints.from, arcPoints.through, arcPoints.to);
        path.add(new paper.Point(x, y));
        path.closed = true;
        path.selected = false;
        
        return path;
    }

    var generatePieSegmentsForAngle = function (angle)
    {   
        var arcPoints = makeArcPoints(x, y, r, angle);
    
        var path = paper.Path.Arc(arcPoints.from, arcPoints.through, arcPoints.to);
        path.add(new paper.Point(x, y));
        path.closed = true;
        path.selected = false;

        var segments = path.segments;
        path.remove();
        delete path;
        return segments;
    }

    var updateClock = function(speed, isInfinite) 
    {
        if(degrees == 359)
        {
            degrees = 0;
            backgroundCircle.fillColor = alter ? secondColor : firstColor;
            pie.fillColor = alter ? firstColor : secondColor;
            alter = !alter;
        }
        
        degrees = degrees + speed;
        
        pie.fillColor = alter ? secondColor : firstColor;

        if(isInfinite)
        {
            pie.segments = generatePieSegmentsForAngle(180, alter ? secondColor : firstColor);
            pie.matrix.rotation = degrees;
            pie.matrix.rotate(speed);
        }
        else
        {
            pie.segments = generatePieSegmentsForAngle(degrees, alter ? secondColor : firstColor);
            pie.matrix.rotation = 0;
        }
    }

    return [new paper.Group(backgroundCircle, pie), updateClock];
}
