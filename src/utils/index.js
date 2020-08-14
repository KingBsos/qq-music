function realOffset(element) {
    function _realOffset(element, x, y) {
        let parent = element.offsetParent;
        x += element.offsetLeft;
        y += element.offsetTop;
        if (parent === null) return { x, y };
        else return _realOffset(parent, x, y);
    }
    return _realOffset(element, 0, 0);
}

export { realOffset };