import { create, Text, Wrapper } from './create';
import { Carousel } from './Carousel';
import { Panel } from './Panel';
import { TabPanel } from './TabPanel';
import { ListView } from './ListView';


let component = <Carousel data={[
    "https://static001.geekbang.org/resource/image/bb/21/bb38fb7c1073eaee1755f81131f11d21.jpg",
    "https://static001.geekbang.org/resource/image/1b/21/1b809d9a2bdf3ecc481322d7c9223c21.jpg",
    "https://static001.geekbang.org/resource/image/b6/4f/b6d65b2f12646a9fd6b8cb2b020d754f.jpg",
    "https://static001.geekbang.org/resource/image/73/e4/730ea9c393def7975deceb48b3eb6fe4.jpg",
]} />

let panel = <TabPanel>
    <span title="title1">This is content 1</span>
    <span title="title2">This is content 2</span>
    <span title="title3">This is content 3</span>
    <span title="title4">This is content 4</span>
</TabPanel>

const data = [
    { title: '蓝猫', url: "https://static001.geekbang.org/resource/image/bb/21/bb38fb7c1073eaee1755f81131f11d21.jpg" },
    { title: '橘猫加白', url: "https://static001.geekbang.org/resource/image/1b/21/1b809d9a2bdf3ecc481322d7c9223c21.jpg" },
    { title: '狸花加白', url: "https://static001.geekbang.org/resource/image/b6/4f/b6d65b2f12646a9fd6b8cb2b020d754f.jpg" },
    { title: '橘猫', url: "https://static001.geekbang.org/resource/image/73/e4/730ea9c393def7975deceb48b3eb6fe4.jpg" }
];

let list = <ListView data={data}>
    {record => <figure>
        <img src={record.url} />
        <figcaption>
            {record.title}
        </figcaption>
    </figure>}
</ListView>
// let carouselView = <CarouselView title="this is my panel" >
// <span>This is content 1</span>
// <span>This is content 2</span>
// <span>This is content 3</span>
// <span>This is content 4</span>  
// </CarouselView>

// carouselView.mountTo(document.body);
list.mountTo(document.body);
panel.mountTo(document.body);
component.mountTo(document.body);

window.panel = panel