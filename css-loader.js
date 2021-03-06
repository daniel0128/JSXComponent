const css = require('css')
module.exports = function(source, map) {

    const styleSheet = css.parse(source);

    const name = this.resourcePath.match(/([^/]+).css$/)[1];
    // console.log(name);
    for (let rule of styleSheet.stylesheet.rules) {
        rule.selectors = rule.selectors.map(selector => {
            return selector.match(new RegExp(`^.${name}`)) ? selector :
            `.${name} ${selector}`
        });
    }
    // console.log(css.stringify(styleSheet));
    return `

let style = document.createElement('style');
style.innerHTML = ${JSON.stringify(css.stringify(styleSheet))};
document.documentElement.appendChild(style);
    `;
}