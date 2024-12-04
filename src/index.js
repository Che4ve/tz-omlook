import {ProgressBlock} from "./components/ProgressBlock.js";

const progressBlock = new ProgressBlock();

document.body.append(progressBlock);

progressBlock.setValue(37);

progressBlock.onAnimationStart(() => {
    console.log("Animation started");
})

progressBlock.onComplete(() => {
    console.log("Success!");
})

progressBlock.onHide(() => {
    console.log("Hidden")
})