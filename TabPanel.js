import { create, Text, Wrapper } from './create';
import { Animation, Timeline } from './animation';
import { ease } from './cubicBezier';
import { enableGesture } from './gesture';

export class TabPanel {
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

    select(i) {
        for (let view of this.childViews) {
            view.style.display = "none";
        }
        this.childViews[i].style.display = "";

        for (let view of this.titleViews) {
            view.classList.remove('selected');
        }
        this.titleViews[i].classList.add('selected');
        // this.titleView.innerText = this.children[i].title;
    }

    render() {

        this.childViews = this.children.map(child => <div style="min-height: 300px;">{child}</div>);
        this.titleViews = this.children.map((child, i)=> <span style="min-height: 300px; cursor:pointer" onClick={() => this.select(i)}>{child.getAttribute('title')}</span>);
        setTimeout(() => this.select(0), 16);
        return <div class="panel" style="border: solid 1px lightgreen; width: 300px">
            <h1 style="background-color: lightgreen; width:300px;margin:0">{this.titleViews}</h1>
            <div>
                {this.childViews}
            </div>
        </div>;
    }

}
