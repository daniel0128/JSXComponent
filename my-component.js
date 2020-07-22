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

let component = <div id="a" class="b" style="width: 100px; height: 100px; background-color: lightgreen;">
    <div></div>
    <p></p>
    <div></div>
    <div></div>
</div>
// let component = <MyComponent>
// <div>text text text</div>
// </MyComponent>
// component.id = "c"
console.log(component)