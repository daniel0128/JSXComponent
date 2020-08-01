import { create, Text, Wrapper } from './create';
import { Animation, Timeline } from './animation';
import { ease } from './cubicBezier';

class Carousel {
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

        let children = this.data.map(url => {
            let element = <img src={url} />
            element.addEventListener('dragstart', event => event.preventDefault())
            return element
        });

        let position = 0;

        let timeline = new Timeline;
        // window.xtimeline = timeline;
        timeline.start();
        let nextPic = () => {
            let nextPosition = (position + 1) % this.data.length;

            let current = children[position];
            let next = children[nextPosition];

            let currentAnimation = new Animation(current.style, 'transform', - 100 * position, - 100 - 100 * position, 500, 0, ease, v => `translateX(${v}%)`);
            let nextAnimation = new Animation(next.style, 'transform', 100 - 100 * nextPosition,  - 100 * nextPosition, 500, 0, ease, v => `translateX(${v}%)`);

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
            
            setTimeout(nextPic, 3000);
        }
        
        setTimeout(nextPic, 3000);
        return <div class="carousel">
            {children}
        </div>;
    }

}

let component = <Carousel data={[
    "https://static001.geekbang.org/resource/image/bb/21/bb38fb7c1073eaee1755f81131f11d21.jpg",
    "https://static001.geekbang.org/resource/image/1b/21/1b809d9a2bdf3ecc481322d7c9223c21.jpg",
    "https://static001.geekbang.org/resource/image/b6/4f/b6d65b2f12646a9fd6b8cb2b020d754f.jpg",
    "https://static001.geekbang.org/resource/image/73/e4/730ea9c393def7975deceb48b3eb6fe4.jpg",
]} />
component.mountTo(document.body)