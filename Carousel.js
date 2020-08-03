import { create, Text, Wrapper } from './create';
import { Animation, Timeline } from './animation';
import { ease } from './cubicBezier';
import { enableGesture } from './gesture';

export class Carousel {
    constructor(config) {
        this.children = [];
        this.attributes = new Map();
        this.properties = new Map();
    }

    setAttribute(name, value) {
        this[name] = value;
    }

    appendChild(child) {
        this.children.push(child)
    }

    mountTo(parent) {
        this.render().mountTo(parent)
    }

    render() {
        let timeline = new Timeline;
        // window.xtimeline = timeline;
        timeline.start();

        let position = 0;

        let nextPicStopHandler = null;


        let children = this.data.map((url, currentPosition) => {
            let prevPosition = (currentPosition - 1 + this.data.length) % this.data.length;
            let nextPosition = (currentPosition + 1) % this.data.length;



            let offset = 0;

            let onStart = () => {
                timeline.pause();
                clearTimeout(nextPicStopHandler);

                let currentElement = children[currentPosition];

                let currentTransformValue = Number(currentElement.style.transform.match(/translateX\(([\s\S]+)px\)/)[1]);
                offset = currentTransformValue + 500 * currentPosition;

            }

            let onPan = event => {
                let currentElement = children[currentPosition];
                let prevElement = children[prevPosition];
                let nextElement = children[nextPosition];

                let dx = event.detail.clientX - event.detail.startX;

                let currentTransformValue = - 500 * currentPosition + offset + dx;
                let prevTransformValue = -500 - 500 * prevPosition + offset + dx;
                let nextTransformValue = 500 - 500 * nextPosition + offset + dx;

                prevElement.style.transform = `translateX(${prevTransformValue}px)`;
                currentElement.style.transform = `translateX(${currentTransformValue}px)`;
                nextElement.style.transform = `translateX(${nextTransformValue}px)`;

                // console.log(currentElement.style.transform);
                // console.log(dx);
            }

            let onPanend = event => {
                let direction = 0;

                let dx = event.detail.clientX - event.detail.startX;

                if (dx + offset > 250) {
                    direction = 1;
                } else if (dx + offset < -250) {
                    direction = -1;
                }

                timeline.reset();
                timeline.start();

                let prevElement = children[prevPosition];
                let currentElement = children[currentPosition];
                let nextElement = children[nextPosition];

                let prevAnimation = new Animation(prevElement.style, 'transform', - 500 - 500 * prevPosition + offset + dx, - 500 - 500 * prevPosition + direction * 500, 500, 0, ease, v => `translateX(${v}px)`);
                let currentAnimation = new Animation(currentElement.style, 'transform', - 500 * currentPosition + offset + dx, - 500 * currentPosition + direction * 500, 500, 0, ease, v => `translateX(${v}px)`);
                let nextAnimation = new Animation(nextElement.style, 'transform', 500 - 500 * nextPosition + offset + dx, 500 - 500 * nextPosition + direction * 500, 500, 0, ease, v => `translateX(${v}px)`);

                timeline.add(prevAnimation);
                timeline.add(currentAnimation);
                timeline.add(nextAnimation);

                position = (position - direction +this.data.length) % this.data.length;

                setTimeout(nextPic, 3000);
            }

            let element = <img src={url} onStart={onStart} onPan={onPan} onPanend={onPanend} enableGesture={true} />
            element.style.transform = 'translateX(0px)';
            element.addEventListener('dragstart', event => event.preventDefault())
            return element;
        });


        let nextPic = () => {
            let nextPosition = (position + 1) % this.data.length;

            let current = children[position];
            let next = children[nextPosition];

            let currentAnimation = new Animation(current.style, 'transform', - 100 * position, - 100 - 100 * position, 500, 0, ease, v => `translateX(${5 * v}px)`);
            let nextAnimation = new Animation(next.style, 'transform', 100 - 100 * nextPosition, - 100 * nextPosition, 500, 0, ease, v => `translateX(${5 * v}px)`);

            timeline.add(currentAnimation);
            timeline.add(nextAnimation);

            position = nextPosition;
            // window.xstopHandler = setTimeout(nextPic, 3000)
            // current.style.transition = "ease 0s";
            // next.style.transition = "ease 0s";

            // current.style.transform = `translateX(${- 100 * position}%)`;
            // next.style.transform = `translateX(${100 - 100 * nextPosition}%)`;

            // setTimeout(function () {
            //     current.style.transition = ""; // "" means use css rule
            //     next.style.transition = "";

            //     current.style.transform = `translate(${-100 - 100 * position}%)`;
            //     next.style.transform = `translateX(${-100 * nextPosition}%)`;

            //     position = nextPosition;
            // }, 16);

            nextPicStopHandler = setTimeout(nextPic, 3000);
        }

        nextPicStopHandler = setTimeout(nextPic, 3000);
        return <div class="carousel">
            {children}
        </div>;
    }

}
