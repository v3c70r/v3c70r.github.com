'use strict';
    var canvas = document.querySelector('#canvas'),
    ctx = canvas.getContext('2d'),
    PI = Math.PI;

    // Settings
    var r1 = 150,
    r2 = r1 / 2,
    color = "#000",
    speed = 1,
    centerX = window.innerWidth / 2,
    centerY = window.innerHeight / 2,
    angle = 0;

    // Start animation
    function init() {
        ctx.canvas.width = window.innerWidth;
        ctx.canvas.height = window.innerHeight;

        ctx.strokeStyle = color;
        window.requestAnimationFrame(draw);
    }

    // Redraw
    function draw() {
        ctx.clearRect(0, 0, centerX * 2, centerY * 2);

        angle -= PI / 360 * speed;

        drawTriangle(ctx, angle, r1);
        drawTriangle(ctx, angle * -1, r2);

        drawConnectors(ctx, angle, r1, r2);

        window.requestAnimationFrame(draw);
    }

    window.onresize = function (e) {
        ctx.canvas.width = window.innerWidth;
        ctx.canvas.height = window.innerHeight;

        centerX = window.innerWidth / 2;
        centerY = window.innerHeight / 2;
    };

    init();
    //=======================================

    // Draw triangle at angle and radius
    function drawTriangle(ctx, angle, radius) {
        var points = getTrianglePoints(angle, radius);

        ctx.globalAlpha = 1;
        ctx.beginPath();
        ctx.moveTo(points.a[0], points.a[1]);

        ctx.lineTo(points.b[0], points.b[1]);
        ctx.lineTo(points.c[0], points.c[1]);
        ctx.lineTo(points.a[0], points.a[1]);

        ctx.stroke();
    }

    // Return coordinates of triangle points
    function getTrianglePoints(angle, radius) {
        var ax = undefined,
        ay = undefined,
        bx = undefined,
        by = undefined,
        cx = undefined,
        cy = undefined;

        ax = centerX + radius * Math.cos(angle);
        ay = centerY + radius * Math.sin(angle);

        bx = centerX + radius * Math.cos(angle - 2 * PI / 3);
        by = centerY + radius * Math.sin(angle - 2 * PI / 3);

        cx = centerX + radius * Math.cos(angle - 4 * PI / 3);
        cy = centerY + radius * Math.sin(angle - 4 * PI / 3);

        return {
            a: [ax, ay],
            b: [bx, by],
            c: [cx, cy]
        };
    }

    // Draw lines between triangles's points
    function drawConnectors(ctx, angle, r1, r2) {
        var p1 = getTrianglePoints(angle, r1),
        p2 = getTrianglePoints(angle * -1, r2);

        for (var plot1 in p1) {
            for (var plot2 in p2) {
                ctx.moveTo(p1[plot1][0], p1[plot1][1]);
                ctx.lineTo(p2[plot2][0], p2[plot2][1]);
            }
        }

        ctx.stroke();
    }
