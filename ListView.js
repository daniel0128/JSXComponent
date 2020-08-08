import { create, Text, Wrapper } from './create';
import { Animation, Timeline } from './animation';
import { ease } from './cubicBezier';
import { enableGesture } from './gesture';

export class ListView {
    constructor(config) {
        this.children = [];
        this.attributes = new Map();
        this.properties = new Map();
        this.state = Object.create(null);
    }

    setAttribute(name, value) {
        this[name] = value;
    }

    getAttribute(name) {
        return this[name];
    }

    appendChild(child) {
        this.children.push(child)
    }

    mountTo(parent) {
        this.render().mountTo(parent)
    }

    render() {
        const data = this.getAttribute('data');
        return <div class="list-view" style="width: 300px">
            {
                data.map(this.children[0])
            }
        </div>
    }

}
