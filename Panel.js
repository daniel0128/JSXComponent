import { create, Text, Wrapper } from './create';
import { Animation, Timeline } from './animation';
import { ease } from './cubicBezier';
import { enableGesture } from './gesture';

export class Panel {
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
        return <div class="panel" style="border: solid 1px lightgreen; width: 300px">
            <h1 style="background-color: lightgreen; width: 300px; margin: 0">
                {this.title}
            </h1>
            <div style="min-height: 300px;">
            {this.children}
            </div>
        </div>;
    }

}
