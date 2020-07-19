function create(Cls, attributes, ...children) {
    let o;
    if (typeof Cls === 'string') {
        o = new Wrapper(Cls);
    } else  {
        o = new Cls({
            timer: {}
        });
    }


    for (let name in attributes) {
        // o[name] = attributes[name]
        o.setAttribute(name, attributes[name]);
    }

    for (let child of children) {
        if (typeof child === 'string') {
            child = new Text(child)
        }
        o.appendChild(child);
        // o.children.push(child)
    }
    return o;
}

class Text {
    constructor(text) {
        this.root = document.createTextNode(text)
    }

    mountTo(parent) {
        parent.appendChild(this.root);
    }
}

class Wrapper {
    
    constructor(type) {
        this.children = [];
        this.root = document.createElement(type);
    }

    setAttribute(name, value) {
        this.root.setAttribute(name, value)
    }

    appendChild(child) {
        this.children.push(child)
        child.mountTo(this.root);
    }

    mountTo(parent) {
        parent.appendChild(this.root);
        for (let child of this.children) {
            child.mountTo(this.root);
        }
    }

}

class MyComponent {
    constructor(config) {
        this.children = [];
        this.root = document.createElement('div');
    }

    setAttribute(name, value) {
        this.root.setAttribute(name, value)
    }

    appendChild(child) {
        this.children.push(child)
        // this.children.push(child)
        // child.mountTo(this.root);
    }

    mountTo(parent) {
        this.slot = <div></div>
        
        for (let child of this.children) {
            this.slot.appendChild(child)
        }
        this.render().mountTo(parent)
    }

    render() {
        return <article>
            <header>I'm a header</header>
            {this.slot}
            <footer>I'm a footer</footer>
        </article>
    }

}

// let component = <div id="a" class="b" style="width: 100px; height: 100px; background-color: lightgreen;">
//     <div></div>
//     <p></p>
//     <div></div>
//     <div></div>
// </div>
let component = <MyComponent>
<div>text text text</div>
</MyComponent>
// component.id = "c"
// console.log(component)
component.mountTo(document.body)