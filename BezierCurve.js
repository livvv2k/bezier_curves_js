// Copyright (C) 2019 smiley3 <ml.smiley3@gmail.com>
// SPDX-License-Identifier: GPL-2.0-or-later

class point
{
    constructor()
    {
        this.coords = Array.from(arguments);
    }

    add(other)
    {
        for (let i = 0; i < this.coords.length; ++i)
            this.coords[i] += other.coords[i];

        return this;
    }

    mult(z)
    {
        for (let i = 0; i < this.coords.length; ++i)
            this.coords[i] *= z;

        return this;
    }

    clone()
    {
        return new point(...this.coords);
    }
}

class BezierCurve
{
    constructor(points)
    {
        this.order = points.length - 1;
        this.points = points;
    }

    AddPoint(point)
    {
        this.order++;
        this.points.push(point);
    }

    GetValue(t)
    {
        let factorial = (num) => {
            let val = 1;
            for (let i = 2; i <= num; ++i)
                val *= i;
            return val;
        };
        let val = new point(...(new Array(this.points[0].coords.length).fill(0)));
        for (let i = 0; i <= this.order; ++i)
            val.add(this.points[i].clone().mult((factorial(this.order) / (factorial(i) * factorial(this.order - i))) * Math.pow(1 - t, this.order - i) * Math.pow(t, i))); // TODO: cache things
        return val;
    }
}

/*
var testPointA = new point(25, 110);
var testPointB = new point(52, 183);
var testPointC = new point(30, 226);
var testBez = new BezierCurve([testPointA, testPointB, testPointC]);

for (let i = 0; i <= 1; i+=0.1)
    console.log(testBez.GetValue(i).coords);
*/
