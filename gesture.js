export function enableGesture(element) {
    let contexts = Object.create(null);

    let MOUSE_SYMBOL = Symbol('mouse');

    if (!document.ontouchstart !== null) {// whether on device or on screen
        element.addEventListener('mousedown', () => {
            contexts[MOUSE_SYMBOL] = Object.create(null);
            start(event, contexts[MOUSE_SYMBOL])
            let mousemove = event => {
                // console.log(event.clientX, event.clientY);
                move(event, contexts[MOUSE_SYMBOL])
            }

            let mouseend = event => {
                end(event, contexts[MOUSE_SYMBOL])
                document.removeEventListener('mousemove', mousemove);
                document.removeEventListener('mouseup', mouseend)
            }

            document.addEventListener('mousemove', mousemove);
            document.addEventListener('mouseup', mouseend);
        });
    }

    element.addEventListener('touchstart', event => {
        for (let touch of event.changedTouches) {
            contexts[touch.identifier] = Object.create(null);
            start(touch, contexts[touch.identifier])
        }
    });

    element.addEventListener('touchmove', event => {
        for (let touch of event.changedTouches) {
            move(touch, contexts[touch.identifier])
        }
    });

    element.addEventListener('touchend', event => {
        for (let touch of event.changedTouches) {
            end(touch, contexts[touch.identifier]);
            delete contexts[touch.identifier];
        }
    });

    element.addEventListener('touchcancel', event => {
        for (let touch of event.changedTouches) {
            cancel(touch, contexts[touch.identifier]);
            delete contexts[touch.identifier];
        }
    });


    //tap

    // pan: panstart panmove (pan) panend

    // flick

    // press: pressstart pressend


    let start = (point, context) => {
        element.dispatchEvent(new CustomEvent('start', {
            detail: {
                startX: point.clientX,
                startY: point.clientY,
                clientX: point.clientX,
                clientY: point.clientY
            }
        }));
        context.startX = point.clientX;
        context.startY = point.clientY;

        context.moves = [];

        context.isTap = true;
        context.isPan = false;
        context.isPress = false;

        context.timeoutHanler = setTimeout(() => {
            if (context.isPress) return;

            context.isTap = false;
            context.isPan = false;
            context.isPress = true;
            element.dispatchEvent(new CustomEvent('pressstart', {}))
        }, 500);


    }

    let move = (point, context) => {
        let dx = point.clientX - context.startX;
        let dy = point.clientY - context.startY;

        if (dx ** 2 + dy ** 2 > 100 && !context.isPan) {
            if (context.isPress) {
                element.dispatchEvent(new CustomEvent('presscancel'));
            }
            context.isTap = false;
            context.isPan = true;
            context.isPress = false;
            // console.log('panstart')
            element.dispatchEvent(new CustomEvent('panstart', {
                detail: {
                    startX: context.startX,
                    startY: context.startY,
                    clientX: point.clientX,
                    clientY: point.clientY
                }
            }));
        }


        if (context.isPan) {
            context.moves.push({
                dx,
                dy,
                t: Date.now()
            });

            context.moves = context.moves.filter(record => Date.now() - record.t < 300);

            // console.log('pan')
            element.dispatchEvent(new CustomEvent('pan', {
                detail: {
                    startX: context.startX,
                    startY: context.startY,
                    clientX: point.clientX,
                    clientY: point.clientY
                }
            }));
            // console.log(e, e.detail);
            // element.dispatchEvent(e);
            // element.dispatchEvent(new CustomEvent('pan', {
            //     detail: {
            //         startX: context.startX,
            //         startY: context.startY,
            //         clientX: point.clientX,
            //         clientY: point.clientY
            //     }
            // }));
        }


        // console.log('move', dx, dy);
    }

    let end = (point, context) => {
        if (context.isPan) {
            let dx = point.clientX - context.startX;
            let dy = point.clientY - context.startY;

            let record = context.moves[0];
            let speed = Math.sqrt((record.dx - dx) ** 2 + (record.dy - dy) ** 2) / (Date.now() - record.t);
            let isFlick = speed > 1.5;
            if (isFlick) {
                element.dispatchEvent(new CustomEvent('flick', {
                    detail: {
                        startX: context.startX,
                        startY: context.startY,
                        clientX: point.clientX,
                        clientY: point.clientY,
                        speed,
                        isFlick
                    }
                }));
            }
            
            element.dispatchEvent(new CustomEvent('panend', {
                detail: {
                    startX: context.startX,
                    startY: context.startY,
                    clientX: point.clientX,
                    clientY: point.clientY,
                    speed,
                    isFlick
                }
            }));

            // console.log('isFlick:', isFlick)
        }
        if (context.isPress) {
            element.dispatchEvent(new CustomEvent('pressend', {}));
        }

        if (context.isTap) {
            element.dispatchEvent(new CustomEvent('tap'))
        }

        clearTimeout(context.timeoutHanler)

    }

    let cancel = (point, context) => {
        element.dispatchEvent(new CustomEvent('canceled', {}));
        clearTimeout(context.timeoutHanler)
    }
}